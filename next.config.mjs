/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    async redirects() {
        return [
            {
                source: '/',
                destination: '/posts',
                permanent: true
            }
        ]
    }
};

export default nextConfig;