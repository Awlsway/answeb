import { createClient } from '@supabase/supabase-js'
import { translations } from '../src/translations.js'

// Supabase configuration
const SUPABASE_URL = 'https://elatnpxydxuocnjobwcl.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsYXRucHh5ZHh1b2Nuam9id2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NTU3ODQsImV4cCI6MjA4NDIzMTc4NH0.TlVpblufQwJkm8j3n16_V-LpOxZOYzz-C7ZxKV2IjnI'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function migrateData() {
    console.log('🚀 Starting data migration...\n')

    try {
        // Migrate Hero Content
        console.log('📝 Migrating hero content...')
        for (const [lang, content] of Object.entries(translations)) {
            const { error } = await supabase.from('hero_content').upsert({
                language: lang,
                eyebrow: content.hero.eyebrow,
                title: content.hero.title,
                tagline: content.hero.tagline,
                cta_text: content.hero.cta,
                services_text: content.hero.services
            }, { onConflict: 'language' })

            if (error) throw error
            console.log(`  ✅ Hero content (${lang})`)
        }

        // Migrate Navigation
        console.log('\n📝 Migrating navigation...')
        for (const [lang, content] of Object.entries(translations)) {
            const { error } = await supabase.from('navigation').upsert({
                language: lang,
                services_text: content.nav.services,
                about_text: content.nav.about,
                testimonials_text: content.nav.testimonials,
                contact_text: content.nav.contact
            }, { onConflict: 'language' })

            if (error) throw error
            console.log(`  ✅ Navigation (${lang})`)
        }

        // Migrate Services
        console.log('\n📝 Migrating services...')
        for (const [lang, content] of Object.entries(translations)) {
            const { error } = await supabase.from('services').upsert({
                language: lang,
                title: content.services.title,
                subtitle: content.services.subtitle,
                product_title: content.services.productVal.title,
                product_desc: content.services.productVal.desc,
                functions_label: content.services.productVal.functions.label,
                functions: content.services.productVal.functions.list,
                auth_info: content.services.productVal.auth,
                platform_info: content.services.productVal.platform
            }, { onConflict: 'language' })

            if (error) throw error
            console.log(`  ✅ Services (${lang})`)
        }

        // Migrate Packages
        console.log('\n📝 Migrating packages...')
        for (const [lang, content] of Object.entries(translations)) {
            // Free package
            await supabase.from('packages').upsert({
                language: lang,
                package_type: 'free',
                title: content.services.packages.free.title,
                price: content.services.packages.free.price,
                limit_info: content.services.packages.free.limit,
                note: content.services.packages.free.note,
                sort_order: 0
            }, { onConflict: 'language,package_type' })

            // ANS-1 package
            await supabase.from('packages').upsert({
                language: lang,
                package_type: 'ans1',
                title: content.services.packages.ans1.title,
                price: content.services.packages.ans1.price,
                limit_info: content.services.packages.ans1.limit,
                devices: content.services.packages.ans1.devices,
                extra_device_fee: content.services.packages.ans1.extra,
                maintenance: content.services.packages.ans1.maintenance,
                consultation_label: content.services.packages.ans1.consultation.label,
                consultation_online: content.services.packages.ans1.consultation.online,
                consultation_physical: content.services.packages.ans1.consultation.physical,
                sort_order: 1
            }, { onConflict: 'language,package_type' })

            console.log(`  ✅ Packages (${lang})`)
        }

        // Migrate Features
        console.log('\n📝 Migrating features...')
        for (const [lang, content] of Object.entries(translations)) {
            // Included features
            for (let i = 0; i < content.services.included.list.length; i++) {
                await supabase.from('features').upsert({
                    language: lang,
                    category: 'included',
                    feature_text: content.services.included.list[i],
                    sort_order: i
                }, { onConflict: 'language,category,feature_text' })
            }

            // Excluded features
            for (let i = 0; i < content.services.excluded.list.length; i++) {
                await supabase.from('features').upsert({
                    language: lang,
                    category: 'excluded',
                    feature_text: content.services.excluded.list[i],
                    sort_order: i
                }, { onConflict: 'language,category,feature_text' })
            }

            console.log(`  ✅ Features (${lang})`)
        }

        // Migrate Timeline
        console.log('\n📝 Migrating timeline...')
        for (const [lang, content] of Object.entries(translations)) {
            await supabase.from('timeline').upsert({
                language: lang,
                title: content.services.timeline.title,
                timeline_text: content.services.timeline.text
            }, { onConflict: 'language' })

            console.log(`  ✅ Timeline (${lang})`)
        }

        // Migrate Support Info
        console.log('\n📝 Migrating support info...')
        for (const [lang, content] of Object.entries(translations)) {
            await supabase.from('support_info').upsert({
                language: lang,
                title: content.services.support.title,
                support_items: content.services.support.list
            }, { onConflict: 'language' })

            console.log(`  ✅ Support info (${lang})`)
        }

        // Migrate Pricing Info
        console.log('\n📝 Migrating pricing info...')
        for (const [lang, content] of Object.entries(translations)) {
            await supabase.from('pricing_info').upsert({
                language: lang,
                title: content.services.pricing.title,
                pricing_items: content.services.pricing.list
            }, { onConflict: 'language' })

            console.log(`  ✅ Pricing info (${lang})`)
        }

        // Migrate Maintenance Info
        console.log('\n📝 Migrating maintenance info...')
        for (const [lang, content] of Object.entries(translations)) {
            await supabase.from('maintenance_info').upsert({
                language: lang,
                title: content.services.maintenance.title,
                subtitle: content.services.maintenance.subtitle,
                maintenance_items: content.services.maintenance.list
            }, { onConflict: 'language' })

            console.log(`  ✅ Maintenance info (${lang})`)
        }

        // Migrate Referral Info
        console.log('\n📝 Migrating referral info...')
        for (const [lang, content] of Object.entries(translations)) {
            await supabase.from('referral_info').upsert({
                language: lang,
                title: content.services.referral.title,
                referral_text: content.services.referral.text
            }, { onConflict: 'language' })

            console.log(`  ✅ Referral info (${lang})`)
        }

        // Migrate About Section
        console.log('\n📝 Migrating about section...')
        for (const [lang, content] of Object.entries(translations)) {
            await supabase.from('about_section').upsert({
                language: lang,
                title: content.about.title,
                about_text: content.about.text
            }, { onConflict: 'language' })

            console.log(`  ✅ About section (${lang})`)
        }

        // Migrate Contact Info
        console.log('\n📝 Migrating contact info...')
        for (const [lang, content] of Object.entries(translations)) {
            await supabase.from('contact_info').upsert({
                language: lang,
                title: content.contact.title,
                name: 'Nyein Pyae Sone',
                role: content.contact.role,
                phone_label: content.contact.phone,
                email_label: content.contact.email,
                phone_value: '+95 9 123 456 789', // Update with actual phone
                email_value: 'contact@ansitsolution.com' // Update with actual email
            }, { onConflict: 'language' })

            console.log(`  ✅ Contact info (${lang})`)
        }

        // Migrate Footer
        console.log('\n📝 Migrating footer...')
        for (const [lang, content] of Object.entries(translations)) {
            await supabase.from('footer_content').upsert({
                language: lang,
                footer_text: content.footer.text
            }, { onConflict: 'language' })

            console.log(`  ✅ Footer (${lang})`)
        }

        console.log('\n✨ Migration completed successfully!')
        console.log('\n📊 Summary:')
        console.log('  - Hero content: ✅')
        console.log('  - Navigation: ✅')
        console.log('  - Services: ✅')
        console.log('  - Packages: ✅')
        console.log('  - Features: ✅')
        console.log('  - Timeline: ✅')
        console.log('  - Support info: ✅')
        console.log('  - Pricing info: ✅')
        console.log('  - Maintenance info: ✅')
        console.log('  - Referral info: ✅')
        console.log('  - About section: ✅')
        console.log('  - Contact info: ✅')
        console.log('  - Footer: ✅')

    } catch (error) {
        console.error('\n❌ Migration failed:', error.message)
        process.exit(1)
    }
}

// Run migration
migrateData()
