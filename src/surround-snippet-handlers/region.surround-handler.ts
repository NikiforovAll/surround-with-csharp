import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class RegionSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: '#region',
        description: 'Code snippet for: #region',
        documentation: "Wraps up a selected text into `#region ... #endregion`.",
        snippet: (new SnippetStringBuilder('#region ')
            .appendPlaceholder('MyRegion') as SnippetStringBuilder)
            .addSelectedText().appendText('#endregion')
    };

    provide(): vscode.CompletionItem {
        var ci = this.completionInfo;
        const completionItem = new vscode.CompletionItem(
            this.completionInfo.label,
            vscode.CompletionItemKind.Snippet);
        completionItem.sortText = `.~${completionItem.label}`;
        completionItem.documentation = new vscode.MarkdownString(ci.documentation);
        completionItem.detail = ci.description;
        completionItem.insertText = ci.snippet;
        return completionItem;
    }

}
