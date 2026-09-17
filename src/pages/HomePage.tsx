import { FlowEngineSection } from '../components/sections/FlowEngineSection'
import { ManifestoSection } from '../components/sections/ManifestoSection'
import { BrandsOrbitSection } from '../components/sections/BrandsOrbitSection'
import { ServicesStorySection } from '../components/sections/ServicesStorySection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { FinalCtaSection } from '../components/sections/FinalCtaSection'
import { pageMeta } from '../data/meta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function HomePage() {
  useDocumentMeta(pageMeta.home)

  return (
    <>
      <h1 className="sr-only">Accelera Flow LTD — Content in motion. Opportunity in flow.</h1>
      <FlowEngineSection />
      <ManifestoSection />
      <BrandsOrbitSection />
      <ServicesStorySection />
      <ProcessSection />
      <FinalCtaSection />
    </>
  )
}
