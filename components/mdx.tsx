import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { Status } from '@/components/status';
import {
  AnatomyDiagram,
  BitFieldDiagram,
  BoxModelDiagram,
  DecisionDiagram,
  ExchangeDiagram,
  FlowDiagram,
  LineMetricsDiagram,
  PhaseDiagram,
  TreeDiagram,
} from '@/components/diagram';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    Step,
    Steps,
    Accordion,
    Accordions,
    File,
    Files,
    Folder,
    TypeTable,
    Status,
    AnatomyDiagram,
    BitFieldDiagram,
    BoxModelDiagram,
    DecisionDiagram,
    ExchangeDiagram,
    FlowDiagram,
    LineMetricsDiagram,
    PhaseDiagram,
    TreeDiagram,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
