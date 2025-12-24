import { describe, expect, it } from 'vitest'
import { snapshotPath, transformFixture } from './helpers'

const formatOptions = {
  enforceFormat: true,
  enforcePrettier: true,
  enforceEslint: true,
  enforceLineSeparation: true
}

describe('transformers', () => {
  it('enforceDirectExports', async () => {
    const result = await transformFixture('Example.tsx', {
      enforceDirectExports: true,
      enforceFunctionComponent: false,
      enforceNamedImports: false,
      ...formatOptions
    })
    await expect(result).toMatchFileSnapshot(snapshotPath('enforceDirectExports'))
  })

  it('enforceFunctionComponent', async () => {
    const result = await transformFixture('Example.tsx', {
      enforceDirectExports: false,
      enforceFunctionComponent: true,
      enforceNamedImports: false,
      ...formatOptions
    })
    await expect(result).toMatchFileSnapshot(snapshotPath('enforceFunctionComponent'))
  })

  it('enforceNamedImports', async () => {
    const result = await transformFixture('Example.tsx', {
      enforceDirectExports: false,
      enforceFunctionComponent: false,
      enforceNamedImports: true,
      ...formatOptions
    })
    await expect(result).toMatchFileSnapshot(snapshotPath('enforceNamedImports'))
  })

  it('enforceFormat', async () => {
    const result = await transformFixture('Example.tsx', {
      enforceDirectExports: false,
      enforceFunctionComponent: false,
      enforceNamedImports: false,
      ...formatOptions
    })
    await expect(result).toMatchFileSnapshot(snapshotPath('enforceFormat'))
  })

  it('combined', async () => {
    const result = await transformFixture('Example.tsx', {
      enforceDirectExports: true,
      enforceFunctionComponent: true,
      enforceNamedImports: true,
      ...formatOptions
    })
    await expect(result).toMatchFileSnapshot(snapshotPath('combined'))
  })
})
