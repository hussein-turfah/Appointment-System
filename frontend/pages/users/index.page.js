import Breadcrumb from "./header";
import Patients from "../patients/index.page"
export default function Users() {
    const breadcrumbItems = [
      { label: 'Doctors', url: '#' },
      { label: 'Secretaries', url: '#' },
      { label: 'Admins' }
    ];
  
    return (
      <div>
        <Breadcrumb items={breadcrumbItems} />
        <Patients />
      </div>
    );
  }

