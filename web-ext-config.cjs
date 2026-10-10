// web-ext config: keeps the packaged .zip to just what the extension needs at
// runtime, not the TypeScript sources and build tooling that live alongside it.
module.exports = {
    ignoreFiles: [
        "*.ts",
        "*.d.ts",
        "*.d.ts.map",
        "*.js.map",
        "tsconfig.json",
        "package.json",
        "package-lock.json",
        "README.md",
        "assets/readme/**",
        "moralSupport.jpeg",
        "moralSupportTwo.jpg",
        "web-ext-config.cjs",
        "web-ext-artifacts/**"
    ]
};
