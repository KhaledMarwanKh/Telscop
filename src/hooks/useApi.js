import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Hook مخصص لاستدعاءات API
export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    immediate = true,
    showToast = true,
    onSuccess,
    onError
  } = options;

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFunction(...args);
      setData(result);

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      setError(err.message);

      if (showToast) {
        toast.error(err.message);
      }

      if (onError) {
        onError(err);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    setData
  };
};

// Hook لاستدعاءات API مع إعادة المحاولة
export const useApiWithRetry = (apiFunction, maxRetries = 3, retryDelay = 1000) => {
  const [retryCount, setRetryCount] = useState(0);

  const executeWithRetry = async (...args) => {
    try {
      return await apiFunction(...args);
    } catch (error) {
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);

        setTimeout(() => {
          executeWithRetry(...args);
        }, retryDelay);

        toast.warning(`فشل في الاتصال، جاري المحاولة مرة أخرى... (${retryCount + 1}/${maxRetries})`);
      } else {
        setRetryCount(0);
        throw error;
      }
    }
  };

  return { executeWithRetry };
};

// Hook للتحميل مع شريط تقدم
export const useFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (apiFunction, file, onProgress) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await apiFunction(file, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
          if (onProgress) {
            onProgress(progress);
          }
        }
      });

      return result;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    uploadFile,
    uploadProgress,
    isUploading
  };
};