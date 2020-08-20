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
        const namespaceCompletionItem = new vscode.CompletionItem(
            this.completionInfo.label,
            vscode.CompletionItemKind.Snippet);
        namespaceCompletionItem.sortText = `.~${namespaceCompletionItem.label}`;
        namespaceCompletionItem.documentation = new vscode.MarkdownString(ci.documentation);
        namespaceCompletionItem.detail = ci.description;
        namespaceCompletionItem.insertText = ci.snippet;
        return namespaceCompletionItem;
    }

}
