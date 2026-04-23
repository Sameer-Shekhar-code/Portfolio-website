import { AboutIllustration } from '@/assets/illustrations'
import { Grid } from '@/components/grid'
import { H2, H6, Paragraph } from '@/components/typography'
import { InlineEdit } from '@/components/inline-edit'

type AboutSectionProps = {
	isDeveloper: boolean
	content: Record<string, string>
}

export function AboutSection({ isDeveloper, content }: AboutSectionProps) {
	return (
		<Grid smFull>
			<div className="col-span-full grid grid-cols-4 gap-6 rounded-xl bg-black px-10vw py-[72px] md:grid-cols-8 md:flex-row md:px-10 lg:grid-cols-12">
				<AboutIllustration className="col-span-full col-start-1 row-start-1 w-[340px] md:w-[500px] lg:col-span-4" />

				<div className="col-span-full flex flex-col items-start gap-8 self-stretch lg:col-span-5 lg:col-start-8">
					<div className="flex flex-col gap-2 self-stretch">
						<H6>About</H6>
						<InlineEdit
							as={H2}
							className="text-light"
							value={content['about_title'] || 'Why hire me for your next project?'}
							contentKey="about_title"
							isDeveloper={isDeveloper}
							multiline={true}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<InlineEdit
							as={Paragraph}
							value={content['about_p1'] || 'I worked with a various background of client and different type of product as a software engineer (frontend) or UI designer. I help them to solve their business problem on the technology end.'}
							contentKey="about_p1"
							isDeveloper={isDeveloper}
							multiline={true}
						/>
						<InlineEdit
							as={Paragraph}
							value={content['about_p2'] || 'I have a principle that is "stay simple and stay humble". I believe, simplicity hides a great deal of complexity and thoroughness. I see every project as a process of solving a problem. Now it\'s time to solve your problems in detail, in depth, and of course with simplicity.'}
							contentKey="about_p2"
							isDeveloper={isDeveloper}
							multiline={true}
						/>
					</div>
				</div>
			</div>
		</Grid>
	)
}
