import nextra from "nextra";

const withNextra = nextra({
    search: true,
    defaultShowCopyCode: true,
});

export default withNextra({
    output: 'export',
    images: {
        unoptimized: true,
        domains: ['img.youtube.com'],
      },
});
