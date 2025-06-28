/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'

const idTypes = [
  // Primary Government-Issued IDs
  'Philippine Passport',
  "Driver's License",
  'National ID (PhilSys)',
  'UMID Card',
  'PRC ID',
  'SSS ID',
  "Voter's ID",
  'Senior Citizen ID',
  'PhilHealth ID',
  'TIN Card',
  // Secondary Government-Issued IDs
  'School ID',
  'Postal ID',
  'Employee ID',
  'Barangay Certificate/Clearance',
  'Company ID',
  'Pag-IBIG Loyalty Card',
  'OWWA Card',
  'NBI Clearance',
  // Other
  'Military ID',
]

const Tenants = () => {
  const [formValues, setFormValues] = useState({
    lastName: '',
    firstName: '',
    email: '',
    contactNumber: '',
    street: '',
    barangay: '',
    city: '',
    province: '',
    idType: '',
    idNumber: '',
    idDocument: null,
    occupationStatus: '',
    occupationPlace: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    unitNumber: '',
    moveInDate: '',
    leaseTerm: '',
    monthlyRent: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormValues((prev) => ({ ...prev, idDocument: file }))
  }

  const fetchTenants = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tenants', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setTenantsList(data)
    } catch (error) {
      console.error('Failed to fetch tenants:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key])
    })

    try {
      const res = await fetch('http://localhost:5000/api/tenants', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })

      if (!res.ok) throw new Error(await res.text())

      alert('Tenant registered successfully!')
      setFormValues({
        lastName: '',
        firstName: '',
        email: '',
        contactNumber: '',
        street: '',
        barangay: '',
        city: '',
        province: '',
        idType: '',
        idNumber: '',
        idDocument: null,
        occupationStatus: '',
        occupationPlace: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        unitNumber: '',
        moveInDate: '',
        leaseTerm: '',
        monthlyRent: '',
      })
      await fetchTenants()
    } catch (err) {
      console.error(err)
      alert('Error registering tenant.')
    }
  }

  return (
    <CContainer className="mt-5">
      <h4 className="mb-4">Register New Tenant</h4>
      <CCard>
        <CCardHeader className="text-body-secondary">
          <strong>Tenant Information</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            {/* Personal Info */}
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formValues.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>

            {/* Address Section */}
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={formValues.street}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="barangay"
                  placeholder="Barangay"
                  value={formValues.barangay}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formValues.city}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={formValues.province}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>

            {/* ID Section */}
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormSelect
                  name="idType"
                  value={formValues.idType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select ID Type</option>
                  {idTypes.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="idNumber"
                  placeholder="ID Number"
                  value={formValues.idNumber}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormInput type="file" name="idDocument" onChange={handleFileChange} required />
              </CCol>
            </CRow>

            {/* Occupation */}
            <hr className="my-4" />
            <h5 className="mb-3">Place of Work / School</h5>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormSelect
                  name="occupationStatus"
                  value={formValues.occupationStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Occupation Status</option>
                  <option value="employee">Employee</option>
                  <option value="employer">Employer</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="student">Student</option>
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="occupationPlace"
                  placeholder="Company / School Name"
                  value={formValues.occupationPlace}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>

            {/* Emergency */}
            <hr className="my-4" />
            <h5 className="mb-3">Emergency Contact</h5>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="emergencyContactName"
                  placeholder="Emergency Contact Name"
                  value={formValues.emergencyContactName}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="emergencyContactNumber"
                  placeholder="Emergency Contact Number"
                  value={formValues.emergencyContactNumber}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>

            {/* Unit Assignment */}
            <hr className="my-4" />
            <h5 className="mb-3">Unit Assignment</h5>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="unitNumber"
                  placeholder="Unit Number"
                  value={formValues.unitNumber}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="date"
                  name="moveInDate"
                  placeholder="Move-in Date"
                  value={formValues.moveInDate}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="leaseTerm"
                  placeholder="Lease Term (e.g. 12 months)"
                  value={formValues.leaseTerm}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="number"
                  name="monthlyRent"
                  placeholder="Monthly Rent (₱)"
                  value={formValues.monthlyRent}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>

            <div className="d-flex justify-content-end">
              <CButton
                type="submit"
                style={{ backgroundColor: '#F28D35', color: 'white', fontWeight: 'bold' }}
              >
                Register Tenant
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default Tenants
