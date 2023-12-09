export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

export const existsGaId = GA_TRACKING_ID !== ''

export const pageView = (url: string) => {
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url,
	})
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type GaEventProps = {
	action: string
	category: string
	label: string
	value?: number
}

export const event = ({ action, category, label, value }: GaEventProps) => {
	if (!existsGaId) return

	window.gtag('event', action, {
		event_category: category,
		event_label: JSON.stringify(label),
		value,
	})
}
