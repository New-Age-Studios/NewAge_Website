"use client";

import { use } from 'react';
import EnContent from './en.mdx';
import PtContent from './pt-br.mdx';

export default function Page({ params }) {
  const resolvedParams = use(params);
  if (resolvedParams?.lang === 'pt-br') {
    return <PtContent />;
  }
  return <EnContent />;
}
