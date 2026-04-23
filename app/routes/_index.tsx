import * as React from 'react'
import { data, type HeadersArgs, useFetcher } from 'react-router'

import { AboutSection } from '@/components/home/about-section'
import { CtaSection } from '@/components/home/cta-section'
import { HeroSection } from '@/components/home/hero-section'
import { ServicesSection } from '@/components/home/services-section'
import { ProjectsSection } from '@/components/home/projects-section'
import { ResearchSection } from '@/components/home/research-section'
import { AchievementsSection } from '@/components/home/achievements-section'
import { Spacer } from '@/components/spacer'

import { isAdmin } from '@/utils/auth.server'
import { 
	getPortfolioContent, 
	getProjects, 
	getResearch, 
	getAchievements, 
	getServices,
	savePortfolioContent
} from '@/utils/content.server'

import { type Route } from './+types/_index'

export function headers({ actionHeaders, loaderHeaders }: HeadersArgs) {
	return actionHeaders ? actionHeaders : loaderHeaders
}

export const loader = async ({ request }: Route.LoaderArgs) => {
	const isDeveloper = await isAdmin(request)
	
	const content = await getPortfolioContent()
	const projects = await getProjects()
	const research = await getResearch()
	const achievements = await getAchievements()
	const services = await getServices()

	return data({
		isDeveloper,
		content,
		projects,
		research,
		achievements,
		services
	})
}

export const action = async ({ request }: Route.ActionArgs) => {
	const isDeveloper = await isAdmin(request)
	if (!isDeveloper) {
		return data({ error: 'Unauthorized' }, { status: 401 })
	}

	const formData = await request.formData()
	const actionType = formData.get('_action')

	if (actionType === 'save_content') {
		const key = formData.get('key') as string
		const value = formData.get('value') as string
		if (key) await savePortfolioContent(key, value)
		return data({ success: true })
	}
	// We will add more actions later for array items (projects, etc.)
	
	return data({ error: 'Invalid action' }, { status: 400 })
}

export default function IndexRoute({ loaderData }: Route.ComponentProps) {
	const { isDeveloper, content, projects, research, achievements, services } = loaderData

	return (
		<React.Fragment>
			<section id="home">
				<HeroSection isDeveloper={isDeveloper} content={content} />
			</section>
			
			<section id="about">
				<AboutSection isDeveloper={isDeveloper} content={content} />
			</section>
			<Spacer size="lg" />
			
			<section id="projects">
				<ProjectsSection isDeveloper={isDeveloper} projects={projects} />
			</section>
			<Spacer size="lg" />

			<section id="research">
				<ResearchSection isDeveloper={isDeveloper} research={research} />
			</section>
			<Spacer size="lg" />

			<section id="achievements">
				<AchievementsSection isDeveloper={isDeveloper} achievements={achievements} />
			</section>
			<Spacer size="lg" />
			
			<section id="services">
				<ServicesSection isDeveloper={isDeveloper} services={services} />
			</section>
			<Spacer size="lg" />
			
			<section id="contact">
				<CtaSection isDeveloper={isDeveloper} content={content} />
			</section>
			<Spacer size="lg" />
		</React.Fragment>
	)
}

export function ErrorBoundary() {
	return (
		<div className="error-container">
			Something unexpected went wrong. Sorry about that.
		</div>
	)
}
