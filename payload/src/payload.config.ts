import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'

import { BlogArticle } from './collections/cms/BlogArticle'
import { Banner } from './collections/cms/Banner'
import { CategoryContent } from './collections/cms/CategoryContent'
import { IndustryChannel } from './collections/cms/IndustryChannel'
import { Zone } from './collections/cms/Zone'

import { TradeShow } from './collections/event/TradeShow'
import { TradeShowBooth } from './collections/event/TradeShowBooth'
import { TourPackage } from './collections/event/TourPackage'
import { VisaApplication } from './collections/event/VisaApplication'
import { HotelBooking } from './collections/event/HotelBooking'
import { AssociationMaster } from './collections/event/AssociationMaster'
import { AssociationEvent } from './collections/event/AssociationEvent'

import { TradeAlertSubscription } from './collections/marketing/TradeAlertSubscription'
import { TradeAlertContent } from './collections/marketing/TradeAlertContent'
import { EmailTemplate } from './collections/marketing/EmailTemplate'
import { EmailCampaign } from './collections/marketing/EmailCampaign'

import { SupplierSitePage } from './collections/site/SupplierSitePage'
import { SupplierSiteBlock } from './collections/site/SupplierSiteBlock'
import { SiteTemplate } from './collections/site/SiteTemplate'
import { SupplierBrandKit } from './collections/site/SupplierBrandKit'

import { HelpArticle } from './collections/help/HelpArticle'
import { FAQItem } from './collections/help/FAQItem'

import { PrivacyPolicyVersion } from './collections/policy/PrivacyPolicyVersion'
import { TermsOfServiceVersion } from './collections/policy/TermsOfServiceVersion'

import { AIPromptTemplate } from './collections/ai/AIPromptTemplate'

import { AiPersona } from './collections/livestream/AiPersona'
import { ScriptTemplate } from './collections/livestream/ScriptTemplate'
import { AvatarLibrary } from './collections/livestream/AvatarLibrary'

import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Cybersilkroads CMS',
    },
  },
  localization: {
    locales: [
      { label: 'Tiếng Việt', code: 'vi' },
      { label: 'English', code: 'en' },
      { label: '中文', code: 'cn' },
    ],
    defaultLocale: 'vi',
    fallback: true,
  },
  collections: [
    Users,
    Media,
    Pages,
    BlogArticle,
    Banner,
    CategoryContent,
    IndustryChannel,
    Zone,
    TradeShow,
    TradeShowBooth,
    TourPackage,
    VisaApplication,
    HotelBooking,
    AssociationMaster,
    AssociationEvent,
    TradeAlertSubscription,
    TradeAlertContent,
    EmailTemplate,
    EmailCampaign,
    SupplierSitePage,
    SupplierSiteBlock,
    SiteTemplate,
    SupplierBrandKit,
    HelpArticle,
    FAQItem,
    PrivacyPolicyVersion,
    TermsOfServiceVersion,
    AIPromptTemplate,
    AiPersona,
    ScriptTemplate,
    AvatarLibrary,
  ],
  globals: [SiteSettings, Navigation, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    schemaName: process.env.PAYLOAD_SCHEMA || 'payload',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  upload: {
    limits: { fileSize: 100_000_000 },
  },
  sharp,
  plugins: [],
  cors: (process.env.PAYLOAD_CORS || 'http://shop.huayuesc.local,http://admin.huayuesc.local').split(','),
  csrf: (process.env.PAYLOAD_CSRF || 'http://shop.huayuesc.local,http://admin.huayuesc.local').split(','),
  rateLimit: {
    max: 2000,
    window: 60_000,
  },
})
