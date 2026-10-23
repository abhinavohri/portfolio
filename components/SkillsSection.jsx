'use client';

import { useEffect, useState } from 'react';
import { fetchGitHubData } from '@/lib/github';
import TechIcon from './TechIcon';

export default function SkillsSection({ skills, openSource }) {
  const [openSourceSkills, setOpenSourceSkills] = useState([]);
  const allSkills = [...new Set([...skills, ...openSourceSkills])];

  useEffect(() => {
    let active = true;

    fetchGitHubData(openSource.repos, openSource.username).then(({ orgs }) => {
      if (active) {
        setOpenSourceSkills(
          orgs.flatMap((org) => org.languages || []).map((skill) => skill.toLowerCase())
        );
      }
    });

    return () => {
      active = false;
    };
  }, [openSource]);

  return (
    <div className="terminalSkills">
      {allSkills.map((tech) => (
        <TechIcon key={tech.toLowerCase()} tech={tech} showLabel variant="compact" />
      ))}
    </div>
  );
}
