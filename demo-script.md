

# The discovery of the ancient application trinket (Alexandra)

- GitHub Spaces [Spaces link](https://github.com/copilot/spaces/housa/2)
- Show how Spaces is configured, and the kind of content you can attach to it

Prompt:
```
Hi! I'm a lost adventurer can you explain what this ancient application is about? Can you also let
me know how to summon it in my own computer?
```
- exec the script via the command
  ```/deploy.sh```
  Following Spaces suggestion (ensure it's `chmod +x`-ed)
- navigate locally to [http://localhost:3000](http://localhost:3000)

# Level 1

- Brainstorm Mode

Prompt:
```
/brainstorm
Create a plan for a modernization of the breath of copilot app.
Remember to:
- Get rid of the scripts/deploy.sh bash script
- Move the app source code in an src/ folder
- Create a GitHub Actions workflow that packages the app and deploys it to GitHub Pages
  - Add attestations to the GitHub Actions workflow for the artifacts (produce those) - see docs for how to use attestations: https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations
  - Also add a demonstration of matrix jobs building the site leveraging windows and ubuntu, with different versions of node
- Maintain ALL the code vulnerabilities, they are needed for the demo
- The monsters should be marked as defeated 1 time
- In the homepage there should be a triforce with Copilot (a laptop), Advanced Security (a lock) and Actions (robot) as the 3 pillars of DevEx!
```

- Custom Agent: Reactifier [[config link](https://github.com/github-community-projects/breath-of-copilot-universe-2025/blob/main/.github/agents/reactifier.md)]

## GitHub Copilot section (Matteo)

- Show GitHub issue [[link](https://github.com/github-community-projects/breath-of-copilot-universe-2025/issues/24)]
- Show GitHub Copilot session [[link](https://github.com/copilot/tasks/pull/PR_kwDOPmSnws6rzb2N?session_id=2814a809-f401-4f06-8e81-37b51b91847d)]
- Show GitHub Pull Request that fixes the issue created [link](https://github.com/github-community-projects/breath-of-copilot-universe-2025/pull/25)
- Merge the PR and the Actions CI/CD should deploy on Pages! If not, you can fix it or use the backup [link](https://turbo-disco-gze28vk.pages.github.io/)

## GitHub Actions section (Matteo)

- Show GitHub Actions workflow file [[link](https://github.com/github-community-projects/breath-of-copilot-universe-2025/blob/main/.github/workflows/deploy.yml)]

# Level 2

## GitHub Advanced Security section (Alexandra)

- Navigate again to local application deployed [[http://localhost:3000](http://localhost:3000)]
- Exec vulnerable query:

```
' OR '1'='1
```

So that we show the unsanitized input vulnerability of the db
- Navigate to one alert with SQL vulnerability [[link](https://github.com/github-community-projects/breath-of-copilot-universe-2025/security/code-scanning/4)]
- Show GitHub Copilot Autofix [[link](https://github.com/github-community-projects/breath-of-copilot-universe-2025/pull/13)]
- Show/Talk about Dependabot and Dependency review
- Custom Agent: Frog Sec Fixer [[config link](https://github.com/github-community-projects/breath-of-copilot-universe-2025/blob/main/.github/agents/frog-sec-fixer.md)]
- Show session ([session link](https://github.com/copilot/tasks/pull/PR_kwDOPmSnws6wP4SV?session_id=8a5325a6-1bd2-4d2b-b278-40fe301548c4))
- Show PR created with FrogSec [[link](https://github.com/github-community-projects/breath-of-copilot-universe-2025/pull/35)]
- Merge Frog Sec Fixer PR
- Show the GitHub pages deployed [[link](https://github-community-projects.github.io/breath-of-copilot-universe-2025/)]
- Exec vulnerable query:

```
' OR '1'='1
```

So that we show it's gone.
- Final slides & Q&A time!
