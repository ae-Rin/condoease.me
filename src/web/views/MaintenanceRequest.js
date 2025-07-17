/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CFormTextarea, CButton } from '@coreui/react'

const MaintenanceRequest = () => {
  const { requestId } = useParams()
  const API_URL = import.meta.env.VITE_APP_API_URL
  const [requestDetails, setRequestDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const res = await fetch(`${API_URL}/api/maintenance-requests/${requestId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch request details')
        }

        const data = await res.json()
        setRequestDetails(data)
      } catch (err) {
        console.error('Error fetching request details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRequestDetails()
  }, [API_URL, requestId])

  const handleUpdateStatus = async (newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/maintenance-requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ status: newStatus, comment }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to update status')
      }

      alert('Status updated successfully!')
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  return (
    <div className="container" style={{ padding: '20px' }}>
      {loading ? (
        <p>Loading request details...</p>
      ) : requestDetails ? (
        <CCard>
          <CCardHeader>
            <h5>Maintenance Request Details</h5>
          </CCardHeader>
          <CCardBody>
            <p>
              <strong>Tenant:</strong> {requestDetails.first_name} {requestDetails.last_name}
            </p>
            <p>
              <strong>Type:</strong> {requestDetails.maintenance_type}
            </p>
            <p>
              <strong>Category:</strong> {requestDetails.category}
            </p>
            <p>
              <strong>Description:</strong> {requestDetails.description}
            </p>
            <p>
              <strong>Status:</strong> {requestDetails.status}
            </p>
            <p>
              <strong>Date Created:</strong>{' '}
              {new Date(requestDetails.created_at).toLocaleDateString()}
            </p>

            <h6>Add Comment</h6>
            <CFormTextarea
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment here..."
            />

            <div className="d-flex justify-content-end mt-3">
              <CButton
                color="success"
                className="me-2"
                onClick={() => handleUpdateStatus('completed')}
              >
                Mark as Completed
              </CButton>
              <CButton
                color="warning"
                className="me-2"
                onClick={() => handleUpdateStatus('ongoing')}
              >
                Mark as Ongoing
              </CButton>
              <CButton color="danger" onClick={() => handleUpdateStatus('archived')}>
                Archive
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      ) : (
        <p>Request not found.</p>
      )}
    </div>
  )
}

export default MaintenanceRequest
