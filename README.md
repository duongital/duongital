### Deploy to firebase

Init firebse with github action: `firebase init hosting:github`

Note: use name `duongital/duongital-intro`

Sample script to deploy:

```yaml
name: Deploy to Firebase Hosting on merge
"on":
  push:
    branches:
      - master
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [10.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT_DUONGITAL_INTRO }}"
          channelId: live
          projectId: duongital-intro
        env:
          FIREBASE_CLI_PREVIEWS: hostingchannels
```
