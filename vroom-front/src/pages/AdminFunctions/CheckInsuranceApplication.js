import React, { useEffect, useState } from 'react';
import { getInsuranceByStatus, updateInsuranceStatus } from '../../services/api';

const CheckInsuranceApplication = () => {
  const [invalidInsurances, setInvalidInsurances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState({});

  const fetchInvalidInsurances = async () => {
    try {
      setLoading(true);
      const response = await getInsuranceByStatus('Invalid');
      setInvalidInsurances(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching invalid insurances:', err);
      setError('Failed to fetch insurance records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvalidInsurances();
  }, []);

  const handleVerify = async (id) => {
    try {
      setProcessing(prev => ({ ...prev, [id]: true }));
      await updateInsuranceStatus(id, 'Valid');
      // Remove the verified insurance from the list
      setInvalidInsurances(prev => prev.filter(insurance => insurance.iid !== id));
    } catch (err) {
      console.error(`Error verifying insurance ${id}:`, err);
      setError(`Failed to verify insurance #${id}`);
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Check Insurance Applications</h2>
        
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {!loading && invalidInsurances.length === 0 && (
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">No invalid insurance applications found.</p>
          </div>
        )}
        
        {invalidInsurances.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Registration No.</th>
                  <th className="py-2 px-4 border-b text-left">Provider</th>
                  <th className="py-2 px-4 border-b text-left">Policy Number</th>
                  <th className="py-2 px-4 border-b text-left">Coverage</th>
                  <th className="py-2 px-4 border-b text-left">Valid Period</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {invalidInsurances.map((insurance) => (
                  <tr key={insurance.iid} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{insurance.regNo}</td>
                    <td className="py-2 px-4 border-b">{insurance.providerName}</td>
                    <td className="py-2 px-4 border-b">{insurance.policyNumber}</td>
                    <td className="py-2 px-4 border-b">${insurance.coverageAmount.toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(insurance.startDate).toLocaleDateString()} - {new Date(insurance.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        {insurance.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleVerify(insurance.iid)}
                        disabled={processing[insurance.iid]}
                        className={`px-3 py-1 rounded text-white ${
                          processing[insurance.iid] ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
                        }`}
                      >
                        {processing[insurance.iid] ? 'Processing...' : 'Verify'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInsuranceApplication;