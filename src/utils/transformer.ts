import { SourceFile } from 'ts-morph'
import { TransformerConfig } from './config'

export interface TransformerParams {
  sourceFile: SourceFile
  config: TransformerConfig
}

export type MatchFn = (params: TransformerParams) => boolean
export type TransformFn = (params: TransformerParams) => Promise<void>

export interface Transformer {
  match: MatchFn
  transform: TransformFn
}
