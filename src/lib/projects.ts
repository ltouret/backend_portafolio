import { getCollection } from 'astro:content';

/** All published projects, newest first. */
export async function getProjects() {
	const projects = await getCollection('projects', ({ data }) => !data.draft);
	return projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
