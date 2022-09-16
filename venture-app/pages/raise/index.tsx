import type { NextPage } from "next";
import { withFormik, FormikProps, FormikErrors, Form, Field, Formik } from 'formik';
import { useState } from "react";
import DatePicker from "react-datepicker";
import { storage } from "../../lib/firebase/firebase";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage"
import {v4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import { getSession, useSession } from "next-auth/react"



// Shape of form values
interface FormValues {
    title: string,
    description:string,
    cap_amt:number,
    min_amt:number,
    highlights:string,
    busi_model:string,
    file: any,
    image: string,
    closingDate: Date,
    email: any
}

interface OtherProps {
    message: string;
}

async function create(data: FormValues ) {

    try {
        console.log("reaching create"+ data)
        fetch('http://localhost:3000/api/create',{
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(() => {
          (data.title="", data.description="", data.busi_model="", data.highlights="", data.file="", data.cap_amt=1000, data.min_amt=1000);
           alert("Project Submited");
        })
    } catch (error) {
        console.log(error)
        alert("Something is wrong cannot submit!")
    }
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message, setFieldValue, values } = props;
    const {data: session, status} = useSession();
    values.email = session?.user?.email
    return (
        <Form>
        <div className="input-container">
            <label>
             Title:
              <Field className="input-field" id="title" name="title" type="text" placeholder="Project Title" />
              {touched.title && errors.title && <div className="error-custom">{errors.title}</div>}
            </label>
            <br/>
            <label>
             Project Description:
             <br/>
                <Field
                component="textarea"
                rows="4"
                cols="80"
                className="form-control"
                id="description"
                name="description"
                variant="outlined"
                label="PROJECT SHORT_DESCRIPTION"
                fullWidth/>
                {touched.description && errors.description && <div className="error-custom">{errors.description}</div>}
            </label>
            <br/>

            <label>
             Targetted Raise Amount:
             <Field className="input-field" id="cap_amt" name="cap_amt" type="number"  />
             {touched.cap_amt && errors.cap_amt && <div className="error-custom">{errors.cap_amt}</div>}
            </label>
            <br/>

            <label>
             Minmum Investment:
             <Field className="input-field" id="min_amt" name="min_amt" type="number" />
             {touched.min_amt && errors.min_amt && <div className="error-custom">{errors.min_amt}</div>}
            </label>
            <br/>

            <label>
            Company Highlights:
             <br/>
              <Field
                component="textarea"
                rows="4"
                cols="80"
                className="form-control"
                id="highlights"
                name="highlights"
                variant="outlined"
                label="PROJECT SHORT_Hightlight"
                fullWidth/>
                {touched.highlights && errors.highlights && <div className="error-custom">{errors.highlights}</div>}
            </label>

            <br/>

            <label>
             Business Model:
             <br/>
             <Field
                component="textarea"
                rows="4"
                cols="80"
                className="form-control"
                id="busi_model"
                name="busi_model"
                variant="outlined"
                label="PROJECT SHORT_Hightlight"
                fullWidth/>
                {touched.busi_model && errors.busi_model && <div className="error-custom">{errors.busi_model}</div>}
            </label>
            <br/>

            <br/>
            <label>
             Upload Project Image:
             <br/>
              <input id="file" name="file" type="file" accept="image/*"  onChange={(event) => {
                setFieldValue("file", event.target.files[0])
              }} />
            </label>
            <br/>

            <br/>
            <label>
             Select Funding Close Date:
             <br/>
             <DatePicker 
                      selected={values.closingDate}
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      name="closingDate"
                      onChange={date => setFieldValue('closingDate', date)}
                    />
              {touched.closingDate && errors.closingDate && <div className="error-custom">{errors.closingDate}</div>}
            </label>
            <br/>
            <br/>
            <button type="submit">
                Submit
            </button>

        </div>
    </Form>
    );
};

// The type of props MyForm receives
interface MyFormProps {
    initialTitle?: string;
    message: string; // if this passed all the way through you might do this or make a union type
  }
  
  // Wrap our form with the withFormik HoC
  const MyForm = withFormik<MyFormProps, FormValues>({

    // Transform outer props into form values
    mapPropsToValues: props => {
      return {
        title: props.initialTitle || '',
        description: '',
        cap_amt:1000,
        min_amt:1000,
        highlights:'',
        busi_model:'',
        image:'',
        file: null,
        closingDate: new Date(),
        email: null
      };
    },
  
    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.title ) {
        errors.title = 'Required!';
      } else if (!isValidTitle(values.title)) {
        errors.title = 'Title too long!';
      }
      if (!values.description ) {
        errors.description = 'Required!';
      }else if (!isValidDescription(values.description)) {
        errors.description = 'Description too long!';
      }
      if (!values.min_amt ) {
        errors.min_amt = 'Required!';
      } else if (!isValidMinimumAnt(values.min_amt)) {
        errors.min_amt = 'Invalid amount! Enter a number within 1000 to 10000.';
      }
      if (!values.cap_amt ) {
        errors.cap_amt = 'Required!';
      } else if (!isValidTargetted(values.min_amt, values.cap_amt)) {
        errors.cap_amt = 'Invalid amount! Targetted Amount cannot be less than Minmum Investment.';
      }
      if (!values.highlights ) {
        errors.highlights = 'Required!';
      }else if (!isValidDescription(values.highlights)) {
        errors.highlights = 'Highlights too long!';;
      }
      if (!values.busi_model ) {
        errors.busi_model = 'Required!';
      }else if (!isValidDescription(values.busi_model)) {
        errors.busi_model = 'Business Model Description too long!';
      }
      if (!values.closingDate ) {
        errors.closingDate = 'Required!';
      } else if (!isValidDate(values.closingDate)) {
        errors.closingDate = 'Closing date cannot be less than today date!';
      }

      return errors;
    },
  
    handleSubmit: values => {
       console.log("HERE!")
       
        const sanitizeHtml = require('sanitize-html');
        
        if(values.file != null){
          // FIle UPload to firebase 
        const imageRef = ref(storage, `images/${values.file.name +v4()}`)
        console.log("filename: "+ values.file.name)
          try{
            uploadBytes(imageRef, values.file).then(() =>{
              console.log("Image uploaded")
              listAll(imageRef).then(() =>{
                getDownloadURL(imageRef).then((url)=>{
                  values.image = url
                    // do submitting things
                  console.log("print values" +values)
                  values.title = sanitizeHtml(values.title)
                  values.description = sanitizeHtml(values.description)
                  values.highlights = sanitizeHtml(values.highlights)
                  values.busi_model = sanitizeHtml(values.busi_model)
                  console.log("business" +values)
                  try{
                    create(values)
                  }catch(error){
                    console.log(error)
                  }
                })
              })
            });
          }catch(error){
            console.log("FIle Uploading ERROR:" + error)
          }
        }else{
              // do submitting things
            console.log("print values" +values)
            values.title = sanitizeHtml(values.title)
            values.description = sanitizeHtml(values.description)
            values.highlights = sanitizeHtml(values.highlights)
            values.busi_model = sanitizeHtml(values.busi_model)
            console.log("business" +values)
            try{
              create(values)
            }catch(error){
              console.log(error)
            }

        }

    },
  })(InnerForm);

const Raise: NextPage = ({  }) => {
    const [startDate, setStartDate] = useState(new Date()); 
    const {data: session, status} = useSession();
    if(session?.user){
      return (
        <div>
           <h3> Raise A Project</h3>
           <MyForm message="Post A Project" />
           <p>Fill up all required values!</p>
        </div>
      )
    }else{
      return(
        <div>
          <h3> Not Authorise to raise projects!</h3>
        </div>
      )
    }
}


export default Raise

function isValidMinimumAnt(min_amt: number) {
    if( min_amt <=0 || min_amt < 1000 || min_amt >10000){
        return false
    }
    return true
}

function isValidTitle(title: string) {
    if(title.length > 100){
        return false
    }
    return true
}
function isValidDescription(description: string) {
    if(description.length > 1200){
        return false
    }
    return true
}

function isValidTargetted(min_amt: number, cap_amt: number) {
    if(cap_amt < min_amt){
        return false
    }
    return true
}

function isValidDate(closingDate: Date) {
    const now = new Date();
    console.log("date is " + closingDate)

    return closingDate > now
}

