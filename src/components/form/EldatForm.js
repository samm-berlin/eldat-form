import React from 'react';
//import Form from "@rjsf/core";
import './EldatForm.css';
import schema from '../../schema_1.0.3';

//import Form from "@rjsf/material-ui";
import { JSONEditor } from "@json-editor/json-editor";

class EldatForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editor: undefined,
            errors: [],
        };
        

        this.submit = this.submit.bind(this);
        this.validate = this.validate.bind(this);
    }

    log = (type) => {
        console.log.bind(console, type);
    }
    fixForForm(){
        schema['$schema'] = 'http://json-schema.org/schema#';
        return schema;
    }
    onSubmit = ({formData}, e) => {
        var data = new Blob([JSON.stringify(formData)], {type: 'text/plain'});
        var url = window.URL.createObjectURL(data);
        document.getElementById('download_link').href = url;
    }
    componentDidMount(){
        //const that = this;
        const element = document.getElementById('editor_holder');
        const editor = new JSONEditor(element, {
            schema: schema,
            theme: 'bootstrap4',
            disable_edit_json: true,
            disable_properties: true,
            compact:true,
            disable_collapse: true,
            iconlib: "spectre",
            /*required_by_default: false,*/
            display_required_only: false,
            remove_button_labels: false,
            disable_array_delete_all_rows: true,
            disable_array_delete_last_row: true,
            disable_array_reorder: true,
            keep_oneof_values: false,
            show_errors: "never",
            no_additional_properties: true
          }
        );
        /*editor.on('change',function() {
            console.log('chajdew');
            
        });*/
        /*editor.watch('root.document.eldat',function() {
            
            var formData = editor.getEditor('root.document.eldat');
            if(formData) {
                console.log(formData.getValue());
                //formData.setValue({});
              
                //console.log(formData.getValue());
                that.validate();
              }
            
        });*/
        console.log(eldatDocument);
        this.setState({editor: editor});
        //editor.setValue(eldatDocument);
        editor.getEditor('root.document.meta').disable();

    }
    validate(){
        // errors is an array of objects, each with a `path`, `property`, and `message` parameter
        // `property` is the schema keyword that triggered the validation error (e.g. "minLength")
        // `path` is a dot separated path into the JSON object (e.g. "root.path.to.field")
        var errors = this.state.editor.validate();
        this.setState({errors: errors});
    }
    submit(){
        var errors = this.state.editor.validate();

        if(errors.length) {
        console.log(errors);
        
        } else {
            var formData = this.state.editor.getValue();
            var data = new Blob([JSON.stringify(formData)], {type: 'text/plain'});
            var url = window.URL.createObjectURL(data);
            const date = new Date();
            document.getElementById('download_link').download = date.toLocaleDateString() + '-' + date.toLocaleTimeString() + '.eldat';
            document.getElementById('download_link').href = url;
            document.getElementById("download_link").click();
        }
    }
    render() {
        return <div>
            {this.state.errors.map((item, index) => (
                <div key={index} className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">{item.message}</h4>
                    {item.property}: {item.path}
                </div>
            ))}
            
            <a id="download_link" download="file.eldat">dl</a>
            <div id="editor_holder"></div>
            
        </div>
    };
}

const eldatDocument = {"document":{"meta":{"version":{"code":"1.0.3"},},"eldat":{"wood_allocation":{"wood_data":[{"wood_id":[{"wood_id_type":"los","wood_id_no":"95431860-769a-4aab-8815"}],"allocated_wood":[{"wood_id":[{"wood_id_type":"pol","wood_id_no":"6ba39ce1-0c82-49a2-88eb"}],"product_data":[{"wood_definition":{"quality":[{"qual_type":"in","qual_rat":100}],"amount":[{"amount_unit":"rmm","amount_value":23.4}],"grade":"ch_r","use":"xy","species":"fi"},"aggregation_type":"pol"}],"coordinate":{"crs":"4326","longitude":8.939663171768188,"latitude":49.87179351105195},"conversion_factor":1,"preservation":false},{"wood_id":[{"wood_id_type":"pol","wood_id_no":"c8d32662-acec-4c0a-aa0b"}],"product_data":[{"wood_definition":{"quality":[{"qual_type":"in","qual_rat":100}],"amount":[{"amount_value":17.5,"amount_unit":"rmm"}],"grade":"ch_r","use":"xy","species":"la"},"aggregation_type":"pol"}],"coordinate":{"longitude":10.002381205558775,"latitude":50.06810347869134,"crs":"4326"},"conversion_factor":1,"preservation":false}],"measurement_method":"mit","felling_date":"2020-01-05T23:00:00.000Z"}],"address":{"supplier":{"contact":[{"contact_telephone":["01234567891"],"role_contact":"Eigentümer","contact_surname":"Brunner","contact_email":"franz.brunner@example.com"}],"business":{"business_data":{"state":"DE","name":"Franz Brunner","street":"Brunnenstr, 34","postcode":"53826","city":"Klemmberg"}}}},"doc_type":"ang","delivery_inf":{}}}}};
//const eldatDocument = {"document":{"eldat":{"wood_allocation":{}}}};
//<button type="submit" className="btn btn-primary" onClick={this.submit}>Save .eldat File</button>
export default EldatForm;