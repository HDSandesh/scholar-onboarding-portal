import { Button, Card } from '@ui5/webcomponents-react'
import React from 'react'
import "@ui5/webcomponents-icons/dist/edit.js"
import './Form.css'
const form = ({isActive}) => {
  return (
    <div className="form-container">
      <Card>
        <div className="form">
          <div className="form-heading">
            <div className="form-title">
              <h3>Long course with some heading</h3>
              <div className="title-subheading">
                <span>
                  Fill By: <span className="title-value">24th Oct 2025</span>
                </span>
              </div>
            </div>
            <div className="form-edit"><Button icon='edit'/></div>
          </div>
          <div className="form-body">
            <p>
              very long text copied from chatgpt as the description which has
              almost no meaning
            </p>
          </div>
          <div className="form-footer">
            <Button design="Emphasized">Responses (0)</Button>
            <Button design={isActive?'Negative':'Positive'}>{isActive?'Deactivate':'Activate'}</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default form
