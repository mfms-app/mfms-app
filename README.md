# MFMS MOBILE APP
The Michigan Fashion Media Summit is an annual conference bringing together leaders in retail, business, and media to provide networking opportunities for students at the University of Michigan. This app will enhance attendee experience and streamline event interactions during the summit. Visit [michiganfashionmediasummit.com](https://www.michiganfashionmediasummit.com) for more information. 

Download now on the [app store](https://apps.apple.com/us/app/mfms/id6743019823). Available for iOS only. 

#### 1. Clone and Install

```bash
# Clone the repo
git clone https://github.com/mfms-app/mfms-app.git

# Navigate to cloned folder in terminal and install dependencies
cd mfms-app
yarn install

# Install Pods
cd ios
pod install
```

#### 2. Open RNS in your iOS simulator

Run this command to start the development server and to start your app on iOS simulator:
```
yarn run:ios
```
If this code doesn't work, make sure platform of iPhone is installed in XCode for simulator. 

open xcode --> command + "," --> platforms --> get iOS 17.2

for newer iphone simulator, use
```
yarn run:ios --simulator="iPhone 16"
```
