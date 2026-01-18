import { useState, useEffect } from 'react'
import { supabase } from '../supabase-config'

/**
 * Custom hook to fetch data from Supabase with real-time updates
 * @param {string} table - The Supabase table name
 * @param {string} language - Current language ('en' or 'my')
 * @param {object} options - Additional options like filters, orderBy
 * @returns {object} - { data, loading, error, refetch }
 */
export function useSupabaseData(table, language = 'en', options = {}) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)

            let query = supabase.from(table).select('*')

            // Filter by language if the table has a language column
            if (options.filterByLanguage !== false) {
                query = query.eq('language', language)
            }

            // Apply additional filters
            if (options.filters) {
                Object.entries(options.filters).forEach(([key, value]) => {
                    query = query.eq(key, value)
                })
            }

            // Apply ordering
            if (options.orderBy) {
                query = query.order(options.orderBy.column, {
                    ascending: options.orderBy.ascending ?? true
                })
            }

            const { data: result, error: fetchError } = await query

            if (fetchError) throw fetchError

            setData(result)
        } catch (err) {
            console.error(`Error fetching from ${table}:`, err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()

        // Set up real-time subscription if enabled
        if (options.realtime) {
            const subscription = supabase
                .channel(`${table}_changes`)
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: table,
                    },
                    (payload) => {
                        console.log('Real-time update:', payload)
                        fetchData() // Refetch data on any change
                    }
                )
                .subscribe()

            return () => {
                subscription.unsubscribe()
            }
        }
    }, [table, language, JSON.stringify(options)])

    return { data, loading, error, refetch: fetchData }
}

/**
 * Hook to fetch all website content for a specific language
 * @param {string} language - Current language ('en' or 'my')
 * @returns {object} - All content organized by section
 */
export function useWebsiteContent(language = 'en') {
    const hero = useSupabaseData('hero_content', language, { realtime: true })
    const services = useSupabaseData('services', language, { realtime: true })
    const packages = useSupabaseData('packages', language, {
        realtime: true,
        orderBy: { column: 'sort_order', ascending: true }
    })
    const features = useSupabaseData('features', language, {
        realtime: true,
        orderBy: { column: 'sort_order', ascending: true }
    })
    const timeline = useSupabaseData('timeline', language, { realtime: true })
    const support = useSupabaseData('support_info', language, { realtime: true })
    const pricing = useSupabaseData('pricing_info', language, { realtime: true })
    const maintenance = useSupabaseData('maintenance_info', language, { realtime: true })
    const referral = useSupabaseData('referral_info', language, { realtime: true })
    const about = useSupabaseData('about_section', language, { realtime: true })
    const testimonials = useSupabaseData('testimonials', language, {
        realtime: true,
        filters: { is_active: true },
        orderBy: { column: 'sort_order', ascending: true }
    })
    const contact = useSupabaseData('contact_info', language, { realtime: true })
    const navigation = useSupabaseData('navigation', language, { realtime: true })
    const footer = useSupabaseData('footer_content', language, { realtime: true })

    const loading = hero.loading || services.loading || packages.loading ||
        features.loading || about.loading || contact.loading ||
        navigation.loading || footer.loading

    const error = hero.error || services.error || packages.error ||
        features.error || about.error || contact.error ||
        navigation.error || footer.error

    return {
        hero: hero.data?.[0] || null,
        services: services.data?.[0] || null,
        packages: packages.data || [],
        features: features.data || [],
        timeline: timeline.data?.[0] || null,
        support: support.data?.[0] || null,
        pricing: pricing.data?.[0] || null,
        maintenance: maintenance.data?.[0] || null,
        referral: referral.data?.[0] || null,
        about: about.data?.[0] || null,
        testimonials: testimonials.data || [],
        contact: contact.data?.[0] || null,
        navigation: navigation.data?.[0] || null,
        footer: footer.data?.[0] || null,
        loading,
        error,
        refetch: () => {
            hero.refetch()
            services.refetch()
            packages.refetch()
            features.refetch()
            timeline.refetch()
            support.refetch()
            pricing.refetch()
            maintenance.refetch()
            referral.refetch()
            about.refetch()
            testimonials.refetch()
            contact.refetch()
            navigation.refetch()
            footer.refetch()
        }
    }
}
