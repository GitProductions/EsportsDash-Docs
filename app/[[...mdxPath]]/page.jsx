import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
    const params = await props.params

    const { metadata } = await importPage(params.mdxPath)

    // lets dynamically create og path/url for each page based on its url - I see no purpose to hard code this into each post
    const ogPath = params.mdxPath ? `/${params.mdxPath.join('/')}` : ''
    if (ogPath) {
        metadata.openGraph = {
            ...metadata.openGraph,
            url: `https://docs.esportsdash.com${ogPath}`
        }

        // adding canoncial url 
        metadata.alternates = {
            canonical: `https://docs.esportsdash.com${ogPath}`,
            ...metadata.alternates,
        }
    }

    return metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
    const params = await props.params
    const result = await importPage(params.mdxPath)
    const { default: MDXContent, toc, metadata } = result
    return (
        <Wrapper toc={toc} metadata={metadata}>
            <MDXContent {...props} params={params} />
        </Wrapper>
    )
}