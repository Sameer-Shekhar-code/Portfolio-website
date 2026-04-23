import * as React from 'react'
import { useFetcher } from 'react-router'
import { clsxm } from '@/utils/clsxm'
import { CheckIcon, PencilIcon } from '@heroicons/react/24/solid'

type InlineEditProps = {
	value: string
	contentKey: string
	isDeveloper: boolean
	as?: React.ElementType
	className?: string
	multiline?: boolean
	placeholder?: string
}

export function InlineEdit({
	value,
	contentKey,
	isDeveloper,
	as: Component = 'span',
	className,
	multiline = false,
	placeholder = 'Empty'
}: InlineEditProps) {
	const [isEditing, setIsEditing] = React.useState(false)
	const [currentValue, setCurrentValue] = React.useState(value || '')
	const fetcher = useFetcher()

	React.useEffect(() => {
		setCurrentValue(value || '')
	}, [value])

	const handleSave = () => {
		fetcher.submit(
			{ _action: 'save_content', key: contentKey, value: currentValue },
			{ method: 'post' }
		)
		setIsEditing(false)
	}

	if (!isDeveloper) {
		return <Component className={className}>{value || placeholder}</Component>
	}

	if (isEditing) {
		return (
			<div className="flex w-full items-start gap-2">
				{multiline ? (
					<textarea
						value={currentValue}
						onChange={(e) => setCurrentValue(e.target.value)}
						className={clsxm('w-full rounded border border-primary-500 bg-transparent p-2 text-white', className)}
						rows={4}
					/>
				) : (
					<input
						type="text"
						value={currentValue}
						onChange={(e) => setCurrentValue(e.target.value)}
						className={clsxm('w-full rounded border border-primary-500 bg-transparent p-2 text-white', className)}
					/>
				)}
				<button
					onClick={handleSave}
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600"
					disabled={fetcher.state !== 'idle'}
				>
					<CheckIcon className="h-5 w-5" />
				</button>
			</div>
		)
	}

	return (
		<div className="group relative inline-flex items-center w-full">
			<Component className={clsxm(className, !value && 'opacity-50 italic')}>
				{value || placeholder}
			</Component>
			<button
				onClick={() => setIsEditing(true)}
				className="absolute -right-10 top-1/2 -translate-y-1/2 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-transform hover:scale-110"
				title="Edit Content"
			>
				<PencilIcon className="h-4 w-4" />
			</button>
		</div>
	)
}
