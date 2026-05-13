-- Permission master (resource.action codes used by RBAC)

INSERT INTO rbac.permission_master (code, resource, action, description) VALUES
-- Tenant admin
('admin.tenant.read','admin.tenant','read','View tenant configuration'),
('admin.tenant.update','admin.tenant','update','Update tenant settings'),
('admin.tenant.suspend','admin.tenant','suspend','Suspend a tenant'),
-- Supplier
('supplier.read','identity.supplier','read','View supplier profile'),
('supplier.create','identity.supplier','create','Onboard new supplier'),
('supplier.update','identity.supplier','update','Edit supplier profile'),
('supplier.suspend','identity.supplier','suspend','Suspend supplier'),
('supplier.verification.promote','identity.supplier','verification_promote','Promote supplier verification tier'),
-- KYC
('kyc.read','identity.kyc_document','read','View KYC documents'),
('kyc.review','identity.kyc_document','review','Approve/reject KYC'),
-- Product/catalog
('product.read','catalog.product','read','View product details'),
('product.create','catalog.product','create','Create product'),
('product.update','catalog.product','update','Edit product'),
('product.delete','catalog.product','delete','Soft-delete product'),
('category.manage','catalog.category','manage','Manage categories'),
-- RFQ
('rfq.create','ord.rfq','create','Create RFQ'),
('rfq.read','ord.rfq','read','View RFQ'),
('rfq.invite_supplier','ord.rfq','invite_supplier','Invite supplier to RFQ'),
('quote.submit','ord.rfq_quote','submit','Submit quote'),
('quote.accept','ord.rfq_quote','accept','Accept quote'),
-- Order
('order.read','ord.order','read','View orders'),
('order.create','ord.order','create','Create order'),
('order.cancel','ord.order','cancel','Cancel order'),
('order.refund','ord.order','refund','Refund order'),
-- Payment/escrow
('payment.read','payment.payment_transaction','read','View payments'),
('payment.refund','payment.payment_transaction','refund','Issue refund'),
('escrow.read','payment.escrow','read','View escrow'),
('escrow.create','payment.escrow','create','Create escrow'),
('escrow.release_milestone','payment.escrow_milestone','release','Release escrow milestone'),
('escrow.refund','payment.escrow','refund','Refund escrow'),
-- Fulfillment
('shipment.read','fulfillment.shipment','read','View shipments'),
('shipment.create','fulfillment.shipment','create','Create shipment'),
('shipment.update_status','fulfillment.shipment','update_status','Update shipment status'),
('qc.start','fulfillment.qc_inspection','start','Start QC inspection'),
('qc.complete','fulfillment.qc_inspection','complete','Complete QC inspection'),
('customs.declare','fulfillment.customs_declaration','submit','Submit customs declaration'),
-- Returns
('rma.create','ord.return_request','create','Create RMA'),
('rma.review','ord.return_request','review','Review RMA'),
('rma.refund','ord.return_request','refund','Refund RMA'),
-- Dispute
('dispute.open','dispute.dispute','open','Open dispute'),
('dispute.escalate','dispute.dispute','escalate','Escalate dispute'),
('dispute.resolve','dispute.dispute','resolve','Resolve dispute'),
('aml.raise_flag','dispute.aml_flag','create','Raise AML flag'),
('aml.review','dispute.aml_flag','review','Review AML flag'),
-- RBAC
('rbac.role.create','rbac.role','create','Create custom role'),
('rbac.role.assign','rbac.user_role_assignment','create','Assign role'),
('rbac.role.revoke','rbac.user_role_assignment','delete','Revoke role'),
('rbac.break_glass.open','rbac.break_glass_access','create','Open break-glass'),
-- GDPR
('gdpr.consent.read','gdpr.consent_record','read','View consents'),
('gdpr.dsr.review','gdpr.data_subject_request','review','Review data subject request'),
('gdpr.dsr.fulfill','gdpr.data_subject_request','fulfill','Fulfill DSR'),
('gdpr.breach.report','gdpr.data_breach_incident','create','Report data breach'),
-- Marketing
('ads.campaign.create','advertising.ad_campaign','create','Create ad campaign'),
('ads.campaign.update','advertising.ad_campaign','update','Edit ad campaign'),
('email.template.create','email_mkt.template','create','Create email template'),
('email.campaign.create','email_mkt.campaign','create','Create email campaign'),
-- Live commerce
('livestream.create','live.livestream','create','Schedule livestream'),
('livestream.host','live.livestream','host','Host livestream'),
-- AI
('ai.invoke','ai.inference_log','invoke','Invoke AI inference'),
('ai.prompt.edit','ai.prompt_template','update','Edit AI prompt template'),
-- VN sourcing
('vn.factory_visit.book','vn_sourcing.factory_visit','create','Book factory visit'),
('vn.interpreter.book','vn_sourcing.interpreter_session','create','Book interpreter')
ON CONFLICT (code) DO UPDATE SET description = EXCLUDED.description;
