# GitHub Copilot Chat Setup Guide (VS Code)

This guide is for using Chat in VS Code to help maintain your website.

## What You Need

- A GitHub account (you already have this)
- VS Code installed
- Internet connection

## Do You Need to Pay?

- You can usually start with a free Copilot option with monthly limits.
- GitHub also may offer trials or paid plans.
- Plan details can change, so check current pricing in your GitHub Copilot settings.

## One-Time Setup Steps

1. Open **VS Code**.
2. Open **Extensions** (`Ctrl + Shift + X` on Windows).
3. Search for and install:
   - **GitHub Copilot**
   - **GitHub Copilot Chat** (install if VS Code asks or if it is not already installed)
4. Sign in to GitHub from VS Code:
   - Click the **Account** icon (bottom left or top right, depending on layout)
   - Choose **Sign in with GitHub**
   - Approve authorization in your browser
5. Return to VS Code and confirm Copilot is active.

## How to Open Chat

Use any one of these:

- Click the Copilot/Chat icon in the sidebar
- Press `Ctrl + I` (inline chat in many VS Code setups)
- Open Command Palette (`Ctrl + Shift + P`) and run: `Chat: Open Chat`

## First Prompts to Try

Copy/paste examples:

- "Explain this file in simple words."
- "Improve this HTML for readability."
- "Add a contact section to this page."
- "Why is this JavaScript not working?"
- "Suggest better CSS for mobile screens."

## Safe Workflow for Website Changes

Always do this order:

1. Pull latest changes
2. Make edits with Copilot help
3. Test locally in browser
4. Commit with a clear message
5. Push to GitHub
6. Netlify auto-deploys

## GitHub Desktop Steps (Windows)

1. Open **GitHub Desktop** and select the website repository.
2. At the top, confirm branch is **main**.
3. Click **Fetch origin**.
4. If shown, click **Pull origin** to download latest changes.
5. Edit files in VS Code.
6. Return to GitHub Desktop and review changed files.
7. Add a short summary (commit message).
8. Click **Commit to main**.
9. Click **Push origin**.
10. Netlify will deploy automatically from GitHub.

## If There Are Conflicts

If GitHub Desktop reports conflicts while pulling:

1. Click **Open in Visual Studio Code** from the conflict message.
2. In VS Code, choose which changes to keep (or combine both) in each conflicted file.
3. Save the files.
4. Go back to GitHub Desktop and click **Mark as resolved**.
5. Click **Continue merge** (or complete the conflict flow shown).
6. Click **Push origin**.

## Good Habits

- Ask Copilot to explain code before accepting changes.
- Make small changes and test often.
- Use clear commit messages.
- If something breaks, ask Chat: "What did I break and how do I fix it?"

## Quick Reminder

**In GitHub Desktop: Fetch/Pull first, then edit, then Commit and Push.**
