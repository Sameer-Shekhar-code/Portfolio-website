import { prisma } from './db.server'

export async function getPortfolioContent() {
	const contentList = await prisma.portfolioContent.findMany()
	const contentMap: Record<string, string> = {}
	for (const item of contentList) {
		contentMap[item.key] = item.value
	}
	return contentMap
}

export async function savePortfolioContent(key: string, value: string) {
	return prisma.portfolioContent.upsert({
		where: { key },
		update: { value },
		create: { key, value },
	})
}

export async function getProjects() {
	return prisma.project.findMany({ orderBy: { order: 'asc' } })
}

export async function getResearch() {
	return prisma.research.findMany({ orderBy: { order: 'asc' } })
}

export async function getAchievements() {
	return prisma.achievement.findMany({ orderBy: { order: 'asc' } })
}

export async function getServices() {
	return prisma.service.findMany({ orderBy: { order: 'asc' } })
}
