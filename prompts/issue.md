Title: Modernize the monster database app

Modernize the app as follows:

- Get rid of the deploy.sh bash script
- Move the app source code in an src/ folder
- Create a GitHub Actions workflow that packages the app and deploys it to GitHub Pages
  - Add attestations to the GitHub Actions workflow for the artifacts (produce those) - see docs for how to use attestations: https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations
  - Also add a demonstration of matrix jobs building the site leveraging windows and ubuntu, with different versions of node
- Maintain ALL the code vulnerabilities, they are needed for the demo
- The monsters should look defeated, greyed out and emoji should be turned into a skull
- In the homepage there should be a triforce with Copilot (a laptop), Advanced Security (a lock) and Actions (robot) as the 3 pillars of DevEx!
