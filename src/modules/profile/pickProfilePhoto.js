import { Alert, NativeModules } from 'react-native';

// Use the legacy native module directly. The package's JS uses TurboModule when
// `global.__turboModuleProxy` exists, but `NativeImagePicker` can be null and crash.
// See: https://github.com/react-native-image-picker/react-native-image-picker/issues
const LIBRARY_OPTIONS = {
  mediaType: 'photo',
  videoQuality: 'high',
  quality: 0.85,
  maxWidth: 960,
  maxHeight: 960,
  includeBase64: true,
  cameraType: 'back',
  selectionLimit: 1,
  saveToPhotos: false,
  durationLimit: 0,
  includeExtra: false,
  presentationStyle: 'pageSheet',
  assetRepresentationMode: 'auto',
};

function getNativeImagePicker() {
  const mod = NativeModules.ImagePicker;
  if (mod && typeof mod.launchImageLibrary === 'function') {
    return mod;
  }
  return null;
}

function normalizeBridgeResult(raw) {
  if (raw == null) return {};
  if (Array.isArray(raw)) {
    return raw[0] && typeof raw[0] === 'object' ? raw[0] : {};
  }
  return typeof raw === 'object' ? raw : {};
}

/**
 * Opens the photo library and returns a data URI or null if cancelled / failed.
 */
export async function pickProfilePhoto() {
  const native = getNativeImagePicker();
  if (!native) {
    Alert.alert(
      'Photo library unavailable',
      'The photo picker native module is missing. Clean the build folder and run the app again (e.g. Product → Clean Build Folder in Xcode, then rebuild).',
    );
    return null;
  }

  let result;
  try {
    result = await new Promise((resolve, reject) => {
      try {
        native.launchImageLibrary(LIBRARY_OPTIONS, (raw) => {
          resolve(normalizeBridgeResult(raw));
        });
      } catch (e) {
        reject(e);
      }
    });
  } catch (e) {
    Alert.alert('Photo picker error', e?.message || 'Could not open the photo library.');
    return null;
  }

  if (result.didCancel || result.errorCode || !result.assets?.length) {
    return null;
  }

  const asset = result.assets[0];
  if (!asset?.base64) {
    Alert.alert(
      'Could not read photo',
      'Try choosing a different image, or rebuild the app if this keeps happening.',
    );
    return null;
  }

  const mime = asset.type && String(asset.type).startsWith('image/')
    ? asset.type
    : 'image/jpeg';
  return `data:${mime};base64,${asset.base64}`;
}
