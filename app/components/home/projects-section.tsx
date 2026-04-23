import { Grid } from '@/components/grid'
import { Header } from '@/components/header'
import { H4, Paragraph } from '@/components/typography'
import { ButtonText } from '@/components/button-text'
import { AnchorOrLink } from '@/components/links/anchor-or-link'
import type { Project } from '@prisma/client'

type ProjectsSectionProps = {
	isDeveloper: boolean
	projects: Project[]
}

export function ProjectsSection({ isDeveloper, projects }: ProjectsSectionProps) {
	return (
		<Grid rowGap>
			<div className="col-span-full row-start-1 flex flex-col space-y-8 lg:col-span-6 lg:col-start-1">
				<Header
					title="Some of the work I've done"
					subTitle="Projects"
					nested
				/>
			</div>

			<div className="col-span-full grid grid-cols-6 gap-8 md:gap-10 lg:col-span-6 lg:col-start-7">
				{projects.map((project) => (
					<div key={project.id} className="col-span-full lg:col-span-3">
						<div className="relative h-full w-full pt-10">
							<div className="relative flex h-full w-full flex-col justify-between space-y-2.5 rounded-xl bg-white px-8 pb-8 pt-8 dark:bg-black">
								<div className="flex flex-col space-y-6 self-stretch">
									<H4 variant="secondary">{project.title}</H4>
									<Paragraph>{project.description}</Paragraph>
									<p className="text-sm font-bold text-primary-500">{project.techStack}</p>
								</div>
								
								<div className="mt-4 flex space-x-4">
									{project.githubUrl && (
										<AnchorOrLink href={project.githubUrl}>
											<ButtonText>GitHub</ButtonText>
										</AnchorOrLink>
									)}
									{project.demoUrl && (
										<AnchorOrLink href={project.demoUrl}>
											<ButtonText>Live Demo</ButtonText>
										</AnchorOrLink>
									)}
								</div>
							</div>
						</div>
					</div>
				))}

				{projects.length === 0 && (
					<div className="col-span-full">
						<Paragraph>No projects to display.</Paragraph>
					</div>
				)}
			</div>
		</Grid>
	)
}
