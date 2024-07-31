import { useState } from 'react';

export const useBlock = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const localString = localStorage.getItem('user');
  const tokenData = localString ? JSON.parse(localString) : {};
  const token = tokenData.token ||null;
  const block = async (_id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const response = await fetch(`/api/users/block/${_id}`, {
      method: 'PUT',headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const json = await response.json()
    console.log('API Response:', json)

    if (!response.ok) {
      console.error('Failed to block the user.', json)
      throw new Error(json.error || 'Something went wrong')
    }

    setSuccess(true);
    setLoading(false);

  };

  return { block, error, loading, success };
};
