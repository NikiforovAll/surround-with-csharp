# Surround with CSharp

Brings support of surround-with functionality to vscode for C#. Inspiration comes from from *Visual Studio 2019*.

## Features

* You can surround you code based on two approaches:
  * Trigger snippet insertion as a Command
  * Trigger snippet insertion as a CompletionItem

Action             | Alias                          | Shortcut
-------------------|--------------------------------|-------------------------------------
C#: Surround With  | `surround.with`                | `CTRL + SHIFT + S, CTRL + SHIFT + S`
Trigger completion | `editor.action.triggerSuggest` | `CTRL + SPACE`

## Supported Snippets

| Snippet     | Alias      |
|-------------|------------|
| namespace   | #namespace |
| class       | #class     |
| interface   | #interface |
| struct      | #struct    |
| enum        | #enum      |
| if          | #if        |
| dif         | #dif       |
| else        | #else      |
| do          | #do        |
| while       | #while     |
| for         | #for       |
| foreach     | #foreach   |
| reverse for | #forr      |
| try-catch   | #try       |
| try-finally | #tryf      |
| checked     | #checked   |
| unchecked   | #unchecked |
| unsafe      | #unsafe    |
| using       | #using     |
| region      | #region    |

## Known Issues

## Release Notes

Please see [CHANGELOG.md](./CHANGELOG.md)
