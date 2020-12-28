import { workspace, GlobPattern } from "vscode";
import { LogLevel } from "foam-core";

export enum LinkReferenceDefinitionsSetting {
  withExtensions = "withExtensions",
  withoutExtensions = "withoutExtensions",
  off = "off"
}

export interface MaterializedBacklinksSettings {
  enabled: boolean;
  header: string;
}

export function getWikilinkDefinitionSetting(): LinkReferenceDefinitionsSetting {
  return workspace
    .getConfiguration("foam.edit")
    .get<LinkReferenceDefinitionsSetting>(
      "linkReferenceDefinitions",
      LinkReferenceDefinitionsSetting.withoutExtensions
    );
}

export function getMaterializedBacklinksEnabled(): boolean {
  return workspace
    .getConfiguration("foam.edit.materializedBacklinks")
    .get<boolean>("enabled", false);
}

export function getMaterializedBacklinksHeader(): string {
  return workspace
    .getConfiguration("foam.edit.materializedBacklinks")
    .get<string>("header", "## References");
}

export function getMaterializedBacklinksSettings(): MaterializedBacklinksSettings {
  return {
    enabled: getMaterializedBacklinksEnabled(),
    header: getMaterializedBacklinksHeader()
  };
}

/** Retrieve the list of file ignoring globs. */
export function getIgnoredFilesSetting(): GlobPattern[] {
  return [
    ...workspace.getConfiguration().get("foam.files.ignore", []),
    ...Object.keys(workspace.getConfiguration().get("files.exclude", {}))
  ];
}

/** Retrieves the maximum length for a Graph node title. */
export function getTitleMaxLength(): number {
  return workspace.getConfiguration("foam.graph").get("titleMaxLength");
}

export function getFoamLoggerLevel(): LogLevel {
  return workspace.getConfiguration("foam.logging").get("level") ?? "info";
}
