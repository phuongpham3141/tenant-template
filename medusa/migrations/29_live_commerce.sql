-- Migration 29: Live Commerce Pro (Domain 28) — 48 entities
\set ON_ERROR_STOP on

-- Existing 8 (extended from R08 Domain 24)
CREATE TABLE IF NOT EXISTS live.livestream_host_profile (
  user_id UUID PRIMARY KEY REFERENCES identity."user"(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  supplier_id UUID REFERENCES identity.supplier(id),
  creator_program_tier VARCHAR(30) DEFAULT 'none',
  follower_count INT DEFAULT 0,
  total_streams INT DEFAULT 0,
  total_stream_hours NUMERIC(10,2) DEFAULT 0,
  total_gmv_lifetime_usd_minor BIGINT DEFAULT 0,
  total_commission_earned_usd_minor BIGINT DEFAULT 0,
  commission_rate_default_pct NUMERIC(5,2) DEFAULT 5,
  avg_concurrent_viewers INT,
  avg_engagement_rate NUMERIC(5,4),
  specialty_categories UUID[],
  languages_streaming TEXT[],
  health_status VARCHAR(20) DEFAULT 'active',
  last_violation_at TIMESTAMPTZ,
  certifications TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live.livestream_session (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  code VARCHAR(20) NOT NULL UNIQUE,
  host_supplier_id UUID REFERENCES identity.supplier(id),
  host_user_id UUID NOT NULL REFERENCES identity."user"(id),
  title_i18n JSONB,
  description_i18n JSONB,
  thumbnail_url TEXT,
  scheduled_start_at TIMESTAMPTZ,
  actual_start_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled','live','ended','cancelled')),
  session_type VARCHAR(20) CHECK (session_type IN ('regular','flash_sale','auction','qna','cohost','simulcast')),
  orientation VARCHAR(20) CHECK (orientation IN ('vertical','horizontal','square')),
  visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public','followers','subscribers','paid','private_link')),
  require_age_verification BOOLEAN DEFAULT FALSE,
  min_age_required SMALLINT,
  geo_allow TEXT[], geo_block TEXT[],
  stream_provider VARCHAR(20),
  stream_url_hls TEXT, stream_url_rtmp TEXT,
  peak_viewers INT, peak_concurrent_at TIMESTAMPTZ,
  total_viewers INT, total_unique_viewers INT,
  avg_viewer_duration_sec INT,
  conversion_rate_pct NUMERIC(5,2),
  total_likes INT, total_comments INT,
  total_purchases_count INT, total_purchases_value_usd_minor BIGINT,
  gift_revenue_total_coins BIGINT DEFAULT 0,
  gift_revenue_total_usd_minor BIGINT DEFAULT 0,
  replay_url TEXT,
  currently_live BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_live_session_host ON live.livestream_session (host_user_id, scheduled_start_at DESC);
CREATE INDEX IF NOT EXISTS idx_live_session_live ON live.livestream_session (status, scheduled_start_at) WHERE status IN ('scheduled','live');

CREATE TABLE IF NOT EXISTS live.livestream_product_pinned (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  product_id UUID, variant_id UUID,
  display_order INT,
  highlight_until TIMESTAMPTZ,
  card_style VARCHAR(20) DEFAULT 'standard',
  cta_text_i18n JSONB,
  special_in_stream_price_minor BIGINT, currency CHAR(3),
  price_valid_seconds INT,
  quantity_available_in_stream INT, sold_in_stream_count INT DEFAULT 0,
  linked_flash_sale_id UUID, linked_auction_id UUID, linked_lucky_draw_id UUID,
  pinned_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live.livestream_viewer (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  user_id UUID, guest_session_id UUID,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ,
  watch_duration_seconds INT,
  location_country CHAR(2), device_type VARCHAR(20),
  peak_position_in_chat INT,
  gifts_sent_count INT DEFAULT 0,
  gifts_value_coins BIGINT DEFAULT 0,
  reactions_sent INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  products_clicked_count INT DEFAULT 0,
  products_purchased_count INT DEFAULT 0,
  follow_action_taken BOOLEAN DEFAULT FALSE,
  vip_badge_active BOOLEAN DEFAULT FALSE,
  top_sender_rank INT,
  network_quality_avg NUMERIC(5,2)
);

CREATE TABLE IF NOT EXISTS live.livestream_chat_message (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  session_id UUID NOT NULL,
  sender_user_id UUID NOT NULL,
  message_type VARCHAR(40) CHECK (message_type IN ('text','gift_notification','join_announcement','purchase_announcement','host_pinned','system','tip','sticker','emoji_reaction','qna_question','poll_vote','auction_bid')),
  body TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  moderation_status VARCHAR(20) DEFAULT 'approved',
  auto_translated_jsonb JSONB,
  is_pinned_by_host BOOLEAN DEFAULT FALSE,
  highlight_color VARCHAR(20),
  linked_product_id UUID,
  linked_action_id UUID
);
CREATE INDEX IF NOT EXISTS idx_chat_brin ON live.livestream_chat_message USING BRIN (sent_at);
CREATE INDEX IF NOT EXISTS idx_chat_session ON live.livestream_chat_message (session_id, sent_at DESC);

CREATE TABLE IF NOT EXISTS live.livestream_purchase (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  order_id UUID,
  viewer_user_id UUID, product_id UUID,
  purchased_at_stream_time_seconds INT,
  trigger_source VARCHAR(40) CHECK (trigger_source IN ('product_card_click','comment_to_buy','gift_redeem','lucky_draw_win','auction_won','flash_sale_grab','coupon_drop')),
  affiliate_creator_user_id UUID,
  affiliate_commission_pct NUMERIC(5,2),
  affiliate_commission_minor BIGINT,
  used_voucher_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live.livestream_recording (
  session_id UUID PRIMARY KEY REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  final_vod_url TEXT,
  preview_clip_url TEXT,
  highlights_ai_generated BOOLEAN DEFAULT FALSE,
  chapter_count INT,
  downloadable BOOLEAN DEFAULT FALSE,
  replay_view_count BIGINT DEFAULT 0,
  replay_purchase_count INT DEFAULT 0,
  retention_until TIMESTAMPTZ,
  moved_to_cold_storage_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS live.livestream_engagement_metric (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL UNIQUE REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  peak_concurrent_minute_jsonb JSONB,
  gift_velocity_per_minute NUMERIC(10,4),
  comment_velocity_per_minute NUMERIC(10,4),
  reaction_velocity_per_minute NUMERIC(10,4),
  conversion_funnel_jsonb JSONB,
  top_products_jsonb JSONB,
  top_gifters_jsonb JSONB,
  top_commenters_jsonb JSONB,
  simulcast_breakdown_jsonb JSONB,
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Infrastructure (7)
CREATE TABLE IF NOT EXISTS live.livestream_studio_config (
  supplier_id UUID PRIMARY KEY REFERENCES identity.supplier(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL,
  default_orientation VARCHAR(20), default_resolution VARCHAR(10),
  default_bitrate_kbps INT, default_codec VARCHAR(10),
  recording_enabled_default BOOLEAN DEFAULT TRUE,
  watermark_logo_id UUID, branded_template_id UUID,
  allow_simulcast BOOLEAN DEFAULT FALSE,
  default_visibility VARCHAR(20) DEFAULT 'public',
  auto_pin_top_seller_products BOOLEAN DEFAULT TRUE,
  default_moderator_user_ids UUID[],
  custom_emoji_pack_id UUID, custom_gift_pack_id UUID
);

CREATE TABLE IF NOT EXISTS live.livestream_stream_key (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  key_id VARCHAR(80) NOT NULL UNIQUE,
  key_value_encrypted TEXT NOT NULL,
  protocol VARCHAR(10) CHECK (protocol IN ('rtmp','srt')),
  ingest_url TEXT,
  status VARCHAR(20) DEFAULT 'active',
  allowed_source_ips INET[],
  expires_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  last_used_session_id UUID,
  rotated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS live.livestream_simulcast_target (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID REFERENCES live.livestream_session(id),
  supplier_id UUID,
  platform VARCHAR(20) CHECK (platform IN ('facebook','instagram','youtube','tiktok','twitch','own_website','partner_csr_tenant')),
  platform_account_id VARCHAR(120),
  rtmp_destination_url TEXT, rtmp_destination_key_encrypted TEXT,
  status VARCHAR(20),
  bytes_pushed BIGINT,
  peak_viewers_on_platform INT,
  last_error_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS live.livestream_camera_source (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  studio_config_supplier_id UUID,
  source_label VARCHAR(40),
  input_type VARCHAR(20),
  input_url TEXT,
  video_resolution VARCHAR(20),
  audio_source VARCHAR(80),
  position_in_scene INT
);

CREATE TABLE IF NOT EXISTS live.livestream_scene (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  studio_config_supplier_id UUID,
  scene_name VARCHAR(40),
  layout_template VARCHAR(20),
  camera_layout_jsonb JSONB,
  overlay_ids UUID[],
  background_audio_url TEXT,
  transition_in VARCHAR(20),
  default_duration_seconds INT,
  used_in_session_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS live.livestream_overlay (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  studio_config_supplier_id UUID,
  overlay_type VARCHAR(40),
  media_asset_id UUID,
  content_template TEXT,
  position_jsonb JSONB,
  animation_in VARCHAR(40), animation_out VARCHAR(40),
  trigger_event VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS live.livestream_network_health_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  ingress_bitrate_kbps INT, ingress_fps INT,
  ingress_dropped_frames INT,
  ingress_packet_loss_pct NUMERIC(5,2),
  ingress_rtt_ms INT,
  encoder_lag_ms INT,
  transcoder_cpu_pct NUMERIC(5,2),
  viewer_avg_bitrate_kbps INT,
  viewer_avg_buffer_count INT,
  viewer_avg_buffer_duration_ms INT,
  status VARCHAR(20),
  alerts_triggered_jsonb JSONB
);
CREATE INDEX IF NOT EXISTS idx_net_health_brin ON live.livestream_network_health_log USING BRIN (recorded_at);

-- Host & Affiliate (4)
CREATE TABLE IF NOT EXISTS live.livestream_cohost_invitation (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  invited_by_host_user_id UUID,
  invited_user_id UUID,
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ, declined_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ, left_at TIMESTAMPTZ,
  role_in_stream VARCHAR(30),
  commission_split_pct NUMERIC(5,2),
  audio_only BOOLEAN DEFAULT FALSE,
  video_enabled BOOLEAN DEFAULT TRUE,
  screen_share_permission BOOLEAN DEFAULT FALSE,
  mic_muted_by_host_until TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS live.livestream_moderator_assignment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID, recurring_for_host_id UUID,
  moderator_user_id UUID NOT NULL,
  assigned_by_host_user_id UUID,
  permissions_jsonb JSONB,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  sessions_moderated_count INT DEFAULT 0,
  ai_assistant_enabled BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS live.livestream_affiliate_program (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  program_code VARCHAR(60) NOT NULL UNIQUE,
  name VARCHAR(255),
  supplier_id UUID,
  commission_rate_pct NUMERIC(5,2),
  commission_type VARCHAR(20) CHECK (commission_type IN ('gmv','item_count','target_plan')),
  commission_clawback_on_return BOOLEAN DEFAULT TRUE,
  eligible_categories UUID[],
  min_creator_followers INT, min_creator_engagement_rate NUMERIC(5,4),
  application_required BOOLEAN DEFAULT TRUE,
  auto_approval_above_threshold INT,
  payout_schedule VARCHAR(20) CHECK (payout_schedule IN ('per_order','weekly','monthly')),
  status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS live.livestream_affiliate_relationship (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  program_id UUID NOT NULL REFERENCES live.livestream_affiliate_program(id),
  creator_user_id UUID NOT NULL,
  supplier_id UUID NOT NULL,
  relationship_type VARCHAR(20),
  custom_commission_rate_pct NUMERIC(5,2),
  gmv_lifetime_usd_minor BIGINT DEFAULT 0,
  items_sold_lifetime BIGINT DEFAULT 0,
  total_commission_earned_usd_minor BIGINT DEFAULT 0,
  clawback_total_usd_minor BIGINT DEFAULT 0,
  performance_tier VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  terminated_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Engagement (7)
CREATE TABLE IF NOT EXISTS live.livestream_gift_catalog (
  gift_code VARCHAR(40) PRIMARY KEY,
  name_i18n JSONB,
  animation_asset_id UUID,
  thumbnail_url TEXT,
  coin_cost INT NOT NULL,
  real_value_usd_minor BIGINT,
  rarity_tier VARCHAR(20),
  category VARCHAR(40),
  available_for_locales TEXT[],
  seasonal_event_id UUID,
  unlock_min_user_tier VARCHAR(20),
  max_per_session_per_user INT,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS live.livestream_gift_transaction (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL,
  sender_user_id UUID NOT NULL,
  recipient_host_user_id UUID NOT NULL,
  gift_code VARCHAR(40) REFERENCES live.livestream_gift_catalog(gift_code),
  quantity INT DEFAULT 1,
  coin_total_spent INT,
  real_value_usd_minor BIGINT,
  displayed_position INT,
  host_revenue_share_pct NUMERIC(5,2),
  host_revenue_minor BIGINT,
  platform_revenue_minor BIGINT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  animation_played BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_gift_tx_brin ON live.livestream_gift_transaction USING BRIN (sent_at);

CREATE TABLE IF NOT EXISTS live.livestream_coin_wallet (
  user_id UUID PRIMARY KEY REFERENCES identity."user"(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL,
  coins_balance BIGINT DEFAULT 0,
  lifetime_coins_purchased BIGINT DEFAULT 0,
  lifetime_coins_spent BIGINT DEFAULT 0,
  lifetime_diamonds_earned BIGINT DEFAULT 0,
  pending_diamond_payout_usd_minor BIGINT DEFAULT 0,
  last_topup_at TIMESTAMPTZ,
  frozen_balance BIGINT DEFAULT 0,
  wallet_status VARCHAR(20) DEFAULT 'active',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live.livestream_coin_purchase (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  user_id UUID NOT NULL,
  package_id VARCHAR(40),
  coins_received INT,
  real_money_paid_minor BIGINT,
  currency CHAR(3),
  payment_method VARCHAR(20),
  payment_transaction_id UUID,
  status VARCHAR(20),
  completed_at TIMESTAMPTZ,
  fraud_check_status VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live.livestream_poll (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  created_by_user_id UUID,
  question_i18n JSONB,
  options_jsonb JSONB,
  poll_type VARCHAR(20),
  duration_seconds INT,
  started_at TIMESTAMPTZ, ended_at TIMESTAMPTZ,
  total_votes INT DEFAULT 0,
  visible_results VARCHAR(20),
  winner_option_id UUID
);

CREATE TABLE IF NOT EXISTS live.livestream_quiz (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  question_i18n JSONB,
  options_jsonb JSONB,
  duration_seconds INT,
  prize_reward_jsonb JSONB,
  correct_responder_count INT DEFAULT 0,
  fastest_correct_user_id UUID,
  started_at TIMESTAMPTZ, ended_at TIMESTAMPTZ,
  total_responses INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS live.livestream_qna_question (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  asked_by_user_id UUID,
  question_text_i18n JSONB,
  asked_at TIMESTAMPTZ DEFAULT NOW(),
  upvote_count INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','approved_for_display','answered','dismissed','inappropriate')),
  pinned_for_host BOOLEAN DEFAULT FALSE,
  answered_at TIMESTAMPTZ,
  answered_by_host_user_id UUID,
  answer_text_i18n JSONB,
  answer_timestamp_in_stream INT
);

-- Moderation (3)
CREATE TABLE IF NOT EXISTS live.livestream_comment_moderation_action (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  chat_message_id UUID NOT NULL,
  action_type VARCHAR(30),
  executed_by_user_id UUID,
  automated BOOLEAN DEFAULT FALSE,
  reason VARCHAR(40),
  ai_confidence_score NUMERIC(5,4),
  reviewed_by_human BOOLEAN DEFAULT FALSE,
  false_positive BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live.livestream_banned_user (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  banned_user_id UUID NOT NULL,
  scope VARCHAR(20) CHECK (scope IN ('session','host_recurring','platform')),
  session_id UUID, host_user_id UUID,
  banned_by_user_id UUID,
  banned_at TIMESTAMPTZ DEFAULT NOW(),
  banned_until TIMESTAMPTZ,
  reason TEXT,
  evidence_message_ids UUID[],
  appeal_status VARCHAR(20),
  appealed_at TIMESTAMPTZ,
  reversal_decision VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS live.livestream_filter_rule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  scope_type VARCHAR(20),
  scope_id UUID,
  rule_type VARCHAR(30) CHECK (rule_type IN ('keyword_block','regex_block','profanity_list','external_link_filter','repeated_message_throttle','caps_lock_throttle','slow_mode')),
  rule_config_jsonb JSONB,
  action VARCHAR(30),
  locale_specific_for TEXT[],
  active BOOLEAN DEFAULT TRUE,
  hits_count BIGINT DEFAULT 0,
  false_positive_rate NUMERIC(5,4)
);

-- Commerce mechanics (6)
CREATE TABLE IF NOT EXISTS live.livestream_flash_sale (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  triggered_by_host_user_id UUID,
  product_id UUID, variant_id UUID,
  original_price_minor BIGINT,
  flash_price_minor BIGINT,
  currency CHAR(3),
  max_quantity_per_user INT,
  total_quantity_available INT, sold_count INT DEFAULT 0,
  duration_seconds INT,
  started_at TIMESTAMPTZ, ends_at TIMESTAMPTZ,
  status VARCHAR(20),
  countdown_overlay_id UUID,
  urgency_message_i18n JSONB
);

CREATE TABLE IF NOT EXISTS live.livestream_lucky_draw (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  name_i18n JSONB,
  prize_type VARCHAR(20),
  prize_value_minor BIGINT,
  prize_quantity INT,
  draw_method VARCHAR(40) CHECK (draw_method IN ('random','first_n_to_join','fastest_correct_answer','qualifying_purchase')),
  entry_requirement VARCHAR(30),
  keyword_required VARCHAR(80),
  entry_count INT DEFAULT 0,
  draw_at TIMESTAMPTZ,
  winner_user_ids UUID[],
  drawn_by_user_id UUID,
  automated BOOLEAN DEFAULT FALSE,
  status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS live.livestream_lucky_draw_entry (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  lucky_draw_id UUID NOT NULL REFERENCES live.livestream_lucky_draw(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  entry_method VARCHAR(30),
  entry_value TEXT,
  entered_at TIMESTAMPTZ DEFAULT NOW(),
  is_winner BOOLEAN DEFAULT FALSE,
  won_position INT,
  prize_claim_at TIMESTAMPTZ,
  prize_delivered BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS live.livestream_auction (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  product_id UUID, variant_id UUID,
  starting_bid_minor BIGINT,
  bid_increment_minor BIGINT,
  max_bid_cap_minor BIGINT,
  currency CHAR(3),
  duration_seconds INT,
  soft_close_extension_seconds INT,
  started_at TIMESTAMPTZ, ends_at TIMESTAMPTZ,
  bid_count INT DEFAULT 0,
  current_highest_bid_minor BIGINT,
  current_winner_user_id UUID,
  status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS live.livestream_auction_bid (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  auction_id UUID NOT NULL REFERENCES live.livestream_auction(id) ON DELETE CASCADE,
  bidder_user_id UUID NOT NULL,
  bid_amount_minor BIGINT NOT NULL,
  bid_placed_at TIMESTAMPTZ DEFAULT NOW(),
  is_winning_at_time_of_placement BOOLEAN DEFAULT FALSE,
  outbid_at TIMESTAMPTZ, outbid_by_user_id UUID,
  payment_hold_id UUID
);
CREATE INDEX IF NOT EXISTS idx_bid_auction ON live.livestream_auction_bid (auction_id, bid_amount_minor DESC);

CREATE TABLE IF NOT EXISTS live.livestream_treasure_hunt (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  name_i18n JSONB,
  hunt_type VARCHAR(40),
  clues_jsonb JSONB,
  total_treasures INT,
  found_count INT DEFAULT 0,
  reward_per_treasure_jsonb JSONB,
  winners UUID[],
  started_at TIMESTAMPTZ, ends_at TIMESTAMPTZ,
  status VARCHAR(20)
);

-- Voucher, Cart, Comment-to-Buy (3)
CREATE TABLE IF NOT EXISTS live.livestream_voucher_drop (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  coupon_id UUID,
  drop_method VARCHAR(40),
  claim_quantity_total INT, claimed_count INT DEFAULT 0,
  claim_started_at TIMESTAMPTZ, claim_ends_at TIMESTAMPTZ,
  claim_overlay_id UUID,
  success_animation_url TEXT
);

CREATE TABLE IF NOT EXISTS live.livestream_follow_prize (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID, recurring_for_host UUID,
  supplier_id UUID,
  coupon_id UUID,
  target_action VARCHAR(30),
  claim_pop_up_delay_seconds INT,
  valid_for_minutes_after_unlock INT,
  unlocked_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live.livestream_comment_to_buy_rule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID, recurring_for_host UUID,
  trigger_keyword VARCHAR(80) NOT NULL,
  target_product_id UUID, variant_id UUID,
  action VARCHAR(40) CHECK (action IN ('add_to_cart','reserve_quantity','generate_checkout_link','invoice_dm')),
  quantity INT,
  expires_at TIMESTAMPTZ,
  total_triggers INT DEFAULT 0,
  successful_purchases INT DEFAULT 0,
  abandoned_count INT DEFAULT 0
);

-- Pre-stream marketing (4)
CREATE TABLE IF NOT EXISTS live.livestream_schedule_announcement (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID UNIQUE REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  supplier_id UUID, host_user_id UUID,
  scheduled_start_at TIMESTAMPTZ,
  expected_duration_minutes INT,
  teaser_video_url TEXT, teaser_thumbnail_url TEXT,
  title_i18n JSONB, description_i18n JSONB,
  agenda_jsonb JSONB,
  products_featured_preview UUID[],
  early_bird_voucher_id UUID,
  special_guests_jsonb JSONB,
  published_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS live.livestream_rsvp (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  announcement_id UUID NOT NULL REFERENCES live.livestream_schedule_announcement(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rsvp_at TIMESTAMPTZ DEFAULT NOW(),
  reminder_channels TEXT[],
  reminder_sent_at TIMESTAMPTZ,
  attended BOOLEAN DEFAULT FALSE,
  attended_at TIMESTAMPTZ,
  duration_attended_seconds INT,
  UNIQUE (announcement_id, user_id)
);

CREATE TABLE IF NOT EXISTS live.livestream_notification_campaign (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  announcement_id UUID REFERENCES live.livestream_schedule_announcement(id),
  campaign_type VARCHAR(40),
  audience_segment_id UUID,
  scheduled_send_at TIMESTAMPTZ,
  sent_count BIGINT DEFAULT 0,
  opened_count BIGINT DEFAULT 0,
  clicked_count BIGINT DEFAULT 0,
  converted_to_rsvp_count INT DEFAULT 0,
  status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS live.livestream_landing_page (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  announcement_id UUID REFERENCES live.livestream_schedule_announcement(id),
  slug VARCHAR(120) NOT NULL,
  hero_video_url TEXT,
  countdown_timer_enabled BOOLEAN DEFAULT TRUE,
  rsvp_form_config_jsonb JSONB,
  social_share_meta JSONB,
  faq_jsonb JSONB,
  featured_products_preview UUID[],
  view_count BIGINT DEFAULT 0,
  conversion_to_rsvp_pct NUMERIC(5,2)
);

-- Post-stream (3)
CREATE TABLE IF NOT EXISTS live.livestream_highlight_clip (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  clip_uid VARCHAR(40) UNIQUE,
  start_at_seconds INT, end_at_seconds INT,
  duration_seconds INT,
  ai_confidence_score NUMERIC(5,4),
  ai_reason VARCHAR(60),
  clip_video_url TEXT, clip_thumbnail_url TEXT,
  view_count BIGINT DEFAULT 0,
  share_count INT DEFAULT 0,
  auto_published_to TEXT[],
  conversion_revenue_attributed_usd_minor BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live.livestream_replay_chapter (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  position_seconds INT,
  chapter_label_i18n JSONB,
  ai_generated BOOLEAN DEFAULT FALSE,
  related_product_ids UUID[],
  related_action_ids UUID[],
  thumbnail_url TEXT,
  view_jump_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS live.livestream_micro_content (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  content_type VARCHAR(40),
  source_clip_start INT, source_clip_end INT,
  generated_url TEXT,
  intended_platform VARCHAR(40),
  auto_publish_status VARCHAR(20),
  view_count_on_platform BIGINT DEFAULT 0,
  engagement_on_platform JSONB
);

-- Accessibility (3)
CREATE TABLE IF NOT EXISTS live.livestream_caption_track (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  locale CHAR(2),
  generation_provider VARCHAR(20),
  live_caption_segments_url TEXT,
  is_default_for_locale BOOLEAN DEFAULT FALSE,
  accuracy_score NUMERIC(5,4),
  edited_by_user_id UUID,
  total_chars_transcribed BIGINT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS live.livestream_translator_session (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  source_locale CHAR(2), target_locales TEXT[],
  translator_provider VARCHAR(20),
  latency_avg_ms INT,
  translator_user_id UUID,
  tokens_used BIGINT,
  cost_usd_minor BIGINT
);

CREATE TABLE IF NOT EXISTS live.livestream_audio_description (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  session_id UUID NOT NULL REFERENCES live.livestream_session(id) ON DELETE CASCADE,
  locale CHAR(2),
  audio_track_url TEXT,
  generated_by VARCHAR(20),
  narrator_user_id UUID,
  started_at TIMESTAMPTZ, ended_at TIMESTAMPTZ,
  duration_seconds INT
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='live' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='live' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE live.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON live.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON live.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('29_live_commerce.sql', 'Live Commerce Pro: 48 tables');
