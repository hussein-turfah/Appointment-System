import Breadcrumb from "./header";
import Patients from "./details"
export default function Users() {
    const breadcrumbItems = [
      { label: 'Doctors', url: '#' },
      { label: 'Secretaries', url: '#' },
      { label: 'Admins' }
    ];
    const breadcrumbItems2 = [
      { label: 'Details', url: '#' },
      { label: 'Working Time', url: '#' },
    ];
    return (
      <div>
        <Breadcrumb items={breadcrumbItems} />
        <Patients />
      </div>
    );
  }

