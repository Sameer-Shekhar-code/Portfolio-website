import { Grid } from '@/components/grid'
import { Header } from '@/components/header'
import { H4, Paragraph } from '@/components/typography'
import { AnchorOrLink } from '@/components/links/anchor-or-link'
import { ButtonText } from '@/components/button-text'
import type { Research } from '@prisma/client'

type ResearchSectionProps = {
	isDeveloper: boolean
	research: Research[]
}

export function ResearchSection({ isDeveloper, research }: ResearchSectionProps) {
	return (
		<Grid rowGap>
			<div className="col-span-full row-start-1 flex flex-col space-y-8 lg:col-span-6 lg:col-start-1">
				<Header
					title="Publications and Research"
					subTitle="Research"
					nested
				/>
			</div>

			<div className="col-span-full grid grid-cols-6 gap-8 md:gap-10 lg:col-span-6 lg:col-start-7">
				{research.map((item) => (
					<div key={item.id} className="col-span-full lg:col-span-6">
						<div className="relative flex h-full w-full flex-col justify-between space-y-2.5 rounded-xl bg-white px-8 pb-8 pt-8 dark:bg-black">
							<div className="flex flex-col space-y-4 self-stretch">
								<H4 variant="secondary">{item.title}</H4>
								<Paragraph>{item.description}</Paragraph>
							</div>
							
							{item.link && (
								<div className="mt-4">
									<AnchorOrLink href={item.link}>
										<ButtonText>Read Paper</ButtonText>
									</AnchorOrLink>
								</div>
							)}
						</div>
					</div>
				))}

				{research.length === 0 && (
					<div className="col-span-full">
						<Paragraph>No research published yet.</Paragraph>
					</div>
				)}
			</div>
		</Grid>
	)
}
