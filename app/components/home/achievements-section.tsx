import { Grid } from '@/components/grid'
import { Header } from '@/components/header'
import { H4, Paragraph } from '@/components/typography'
import type { Achievement } from '@prisma/client'

type AchievementsSectionProps = {
	isDeveloper: boolean
	achievements: Achievement[]
}

export function AchievementsSection({ isDeveloper, achievements }: AchievementsSectionProps) {
	return (
		<Grid rowGap>
			<div className="col-span-full row-start-1 flex flex-col space-y-8 lg:col-span-6 lg:col-start-1">
				<Header
					title="Awards and Recognitions"
					subTitle="Achievements"
					nested
				/>
			</div>

			<div className="col-span-full grid grid-cols-6 gap-8 md:gap-10 lg:col-span-6 lg:col-start-7">
				{achievements.map((item) => (
					<div key={item.id} className="col-span-full lg:col-span-3">
						<div className="relative flex h-full w-full flex-col justify-between space-y-2.5 rounded-xl bg-white px-8 pb-8 pt-8 dark:bg-black">
							<div className="flex flex-col space-y-4 self-stretch">
								<H4 variant="secondary">{item.title}</H4>
								{item.date && <p className="text-sm font-bold text-primary-500">{item.date}</p>}
								<Paragraph>{item.description}</Paragraph>
							</div>
						</div>
					</div>
				))}

				{achievements.length === 0 && (
					<div className="col-span-full">
						<Paragraph>No achievements listed.</Paragraph>
					</div>
				)}
			</div>
		</Grid>
	)
}
