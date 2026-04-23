import { Button } from '@/components/button'
import { ButtonOutline } from '@/components/button-outline'
import { Grid } from '@/components/grid'
import { AnchorOrLink } from '@/components/links/anchor-or-link'
import { H2 } from '@/components/typography'
import { externalLinks } from '@/external-links'
import { InlineEdit } from '@/components/inline-edit'

import { EnvelopeIcon } from '@heroicons/react/24/solid'

type CtaSectionProps = {
	isDeveloper: boolean
	content: Record<string, string>
}

export function CtaSection({ isDeveloper, content }: CtaSectionProps) {
	return (
		<Grid smFull>
			<div className="col-span-full flex flex-col gap-6 rounded-xl bg-black px-10vw py-[72px] md:flex-row md:px-10 lg:justify-between">
				<InlineEdit
					as={H2}
					className="text-light"
					value={content['cta_title'] || 'Interested working with me?'}
					contentKey="cta_title"
					isDeveloper={isDeveloper}
				/>

				<div className="flex gap-2 self-stretch">
					<AnchorOrLink href={content['cv_url'] || "https://cv.hanihusam.com"}>
						<ButtonOutline>See Portfolio</ButtonOutline>
					</AnchorOrLink>
					<AnchorOrLink href={content['email_url'] || externalLinks.email}>
						<Button icon={EnvelopeIcon} iconClassName="text-light">
							Email Me
						</Button>
					</AnchorOrLink>
				</div>
			</div>
		</Grid>
	)
}
