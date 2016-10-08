using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
#if WINDOWS_UWP
using Windows.Storage;
#else
using PCLStorage;
#endif

namespace ReactNative.Modules.Storage
{
    class StorageAdapter
    {
        private const string DirectoryName = "AsyncStorage";
        public static readonly string FileExtension = ".data";
        public static readonly IDictionary<char, string> s_charToString = new Dictionary<char, string>
        {
            { '\\', "{bsl}" },
            { '/', "{fsl}" },
            { ':', "{col}" },
            { '*', "{asx}" },
            { '?', "{q}" },
            { '<', "{gt}" },
            { '>', "{lt}" },
            { '|', "{bar}" },
            { '\"', "{quo}" },
            { '.', "{dot}" },
            { '{', "{ocb}" },
            { '}', "{ccb}" },
        };

        public void NullCache()
        {
            _cachedFolder = null;
        }

#if WINDOWS_UWP
        private StorageFolder _cachedFolder;

        public async Task<StorageFolder> GetAsyncStorageFolder(bool createIfNotExists)
        {
            if (_cachedFolder == null)
            {
                var localFolder = ApplicationData.Current.LocalFolder;
                var storageFolderItem = await localFolder.TryGetItemAsync(DirectoryName);
                _cachedFolder = storageFolderItem != null || createIfNotExists
                    ? await localFolder.CreateFolderAsync(DirectoryName, CreationCollisionOption.OpenIfExists)
                    : null;
            }

            return _cachedFolder;
        }

        public async Task<string> GetAsync(string key)
        {
            var storageFolder = await GetAsyncStorageFolder(false).ConfigureAwait(false);
            if (storageFolder != null)
            {
                var fileName = GetFileName(key);
                var storageItem = await storageFolder.TryGetItemAsync(fileName).AsTask().ConfigureAwait(false);
                if (storageItem != null)
                {
                    var file = await storageFolder.GetFileAsync(fileName).AsTask().ConfigureAwait(false);
                    return await FileIO.ReadTextAsync(file).AsTask().ConfigureAwait(false);
                }
            }

            return null;
        }

        public async Task<JObject> RemoveAsync(string key)
        {
            var storageFolder = await GetAsyncStorageFolder(false).ConfigureAwait(false);
            if (storageFolder != null)
            {
                var fileName = GetFileName(key);
                var storageItem = await storageFolder.TryGetItemAsync(fileName).AsTask().ConfigureAwait(false);
                if (storageItem != null)
                {
                    await storageItem.DeleteAsync().AsTask().ConfigureAwait(false);
                }
            }

            return null;
        }

        public async Task<JObject> SetAsync(string key, string value)
        {
            var storageFolder = await GetAsyncStorageFolder(true).ConfigureAwait(false);
            var file = await storageFolder.CreateFileAsync(GetFileName(key), CreationCollisionOption.ReplaceExisting).AsTask().ConfigureAwait(false);
            await FileIO.WriteTextAsync(file, value).AsTask().ConfigureAwait(false);
            return default(JObject);
        }
#else
        private IFolder _cachedFolder;

        public async Task<IFolder> GetAsyncStorageFolder(bool createIfNotExists)
        {
            if (_cachedFolder == null)
            {
                var localFolder = FileSystem.Current.LocalStorage;

                if (localFolder.CheckExistsAsync(DirectoryName).Result == ExistenceCheckResult.FolderExists)
                {
                    _cachedFolder = localFolder;
                }
                else
                {
                    _cachedFolder = await localFolder.CreateFolderAsync(DirectoryName, CreationCollisionOption.OpenIfExists);
                }
            }

            return _cachedFolder;
        }

        public async Task<string> GetAsync(string key)
        {
            var storageFolder = await GetAsyncStorageFolder(false).ConfigureAwait(false);
            if (storageFolder != null)
            {
                var fileName = GetFileName(key);
                var storageItem = await storageFolder.GetFileAsync(fileName).ConfigureAwait(false);
                if (storageItem != null)
                {
                    var file = await storageFolder.GetFileAsync(fileName).ConfigureAwait(false);
                    return await FileExtensions.ReadAllTextAsync(file).ConfigureAwait(false);
                }
            }

            return null;
        }
        public async Task<JObject> RemoveAsync(string key)
        {
            var storageFolder = await GetAsyncStorageFolder(false).ConfigureAwait(false);
            if (storageFolder != null)
            {
                var fileName = GetFileName(key);
                var storageItem = await storageFolder.GetFileAsync(fileName).ConfigureAwait(false);
                if (storageItem != null)
                {
                    await storageItem.DeleteAsync().ConfigureAwait(false);
                }
            }

            return null;
        }

        public async Task<JObject> SetAsync(string key, string value)
        {
            var storageFolder = await GetAsyncStorageFolder(true).ConfigureAwait(false);
            var file = await storageFolder.CreateFileAsync(GetFileName(key), CreationCollisionOption.ReplaceExisting).ConfigureAwait(false);
            await FileExtensions.WriteAllTextAsync(file, value).ConfigureAwait(false);
            return default(JObject);
        }
#endif

        private static string GetFileName(string key)
        {
            var sb = default(StringBuilder);
            for (var i = 0; i < key.Length; ++i)
            {
                var ch = key[i];
                var replacement = default(string);
                if (s_charToString.TryGetValue(ch, out replacement))
                {
                    if (sb == null)
                    {
                        sb = new StringBuilder();
                        sb.Append(key, 0, i);
                    }

                    sb.Append(replacement);
                }
                else if (sb != null)
                {
                    sb.Append(ch);
                }
            }

            if (sb == null)
            {
                return string.Concat(key, FileExtension);
            }
            else
            {
                sb.Append(FileExtension);
                return sb.ToString();
            }
        }

    }
}
