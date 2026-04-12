import AsyncStorage from '@react-native-async-storage/async-storage';

export const profileStorageKey = (uid) => `profile:${uid}`;

export function migrateLegacyProfile(stored) {
  if (!stored || typeof stored !== 'object') {
    return {
      firstName: '',
      lastName: '',
      photoBase64: '',
      company: '',
      roleTitle: '',
      bio: '',
      phone: '',
    };
  }
  const p = { ...stored };
  if ((!p.firstName && !p.lastName) && p.displayName) {
    const trimmed = String(p.displayName).trim();
    const i = trimmed.indexOf(' ');
    if (i === -1) {
      p.firstName = trimmed;
      p.lastName = '';
    } else {
      p.firstName = trimmed.slice(0, i).trim();
      p.lastName = trimmed.slice(i + 1).trim();
    }
  }
  if (p.photoBase64 == null) p.photoBase64 = '';
  if (p.firstName == null) p.firstName = '';
  if (p.lastName == null) p.lastName = '';
  if (p.company == null) p.company = '';
  if (p.roleTitle == null) p.roleTitle = '';
  if (p.bio == null) p.bio = '';
  if (p.phone == null) p.phone = '';
  return p;
}

export async function loadStoredProfile(uid) {
  try {
    const raw = await AsyncStorage.getItem(profileStorageKey(uid));
    if (!raw) return migrateLegacyProfile(null);
    return migrateLegacyProfile(JSON.parse(raw));
  } catch {
    return migrateLegacyProfile(null);
  }
}

export async function saveStoredProfile(uid, profile) {
  const { displayName: _drop, ...rest } = profile;
  await AsyncStorage.setItem(profileStorageKey(uid), JSON.stringify(rest));
}

export async function mergeStoredProfile(uid, partial) {
  const current = await loadStoredProfile(uid);
  await saveStoredProfile(uid, { ...current, ...partial });
}

export function formatProfileDisplayName(profile, firebaseUser) {
  const fn = (profile?.firstName || '').trim();
  const ln = (profile?.lastName || '').trim();
  const combined = [fn, ln].filter(Boolean).join(' ');
  if (combined) return combined;
  const dn = firebaseUser?.displayName?.trim();
  if (dn) return dn;
  return '';
}
