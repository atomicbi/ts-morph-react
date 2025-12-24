import { describe, expect, it } from 'vitest'
import { snapshotPath, transformFixture } from './helpers'

describe('transformers', () => {
  it('enforceDirectExports', async () => {
    const result = await transformFixture('Example.tsx', {
      enforceDirectExports: true,
      enforceFunctionComponent: false,
      enforceNamedImports: false,
      enforceFormat: true,
      enforceEslint: true,
      enforcePrettier: true
    })
    await expect(result).toMatchFileSnapshot(snapshotPath('enforceDirectExports'))
  })

  it('enforceFunctionComponent', async () => {
    const result = await transformFixture('Example.tsx', {
      enforceDirectExports: false,
      enforceFunctionComponent: true,
      enforceNamedImports: false,
      enforceFormat: true,
      enforceEslint: true,
      enforcePrettier: true
    })
    await expect(result).toMatchFileSnapshot(snapshotPath('enforceFunctionComponent'))
  })

  it('enforceNamedImports', async () => {
    const result = await transformFixture('Example.tsx', {
      enforceDirectExports: false,
      enforceFunctionComponent: false,
      enforceNamedImports: true,
      enforceFormat: true,
      enforceEslint: true,
      enforcePrettier: true
    })
    await expect(result).toMatchFileSnapshot(snapshotPath('enforceNamedImports'))
  })

  it('enforceFormat', async () => {
    const result = await transformFixture('Example.tsx', {
      enforceDirectExports: false,
      enforceFunctionComponent: false,
      enforceNamedImports: false,
      enforceFormat: true,
      enforceEslint: true,
      enforcePrettier: true
    })
    await expect(result).toMatchFileSnapshot(snapshotPath('enforceFormat'))
  })

  it('combined', async () => {
    const result = await transformFixture('Example.tsx', {
      enforceDirectExports: true,
      enforceFunctionComponent: true,
      enforceNamedImports: true,
      enforceFormat: true,
      enforceEslint: true,
      enforcePrettier: true
    })
    await expect(result).toMatchFileSnapshot(snapshotPath('combined'))
  })
})
