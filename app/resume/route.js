import { readFile } from 'node:fs/promises';

export const dynamic = 'force-static';

export async function GET() {
  const resume = await readFile(new URL('../../data/assets/resume.pdf', import.meta.url));

  return new Response(resume, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="resume.pdf"',
    },
  });
}
