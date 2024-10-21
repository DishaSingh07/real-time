// import { Button } from "@/components/ui/button"
// import { NavigationMenuDemo } from "@/components/ui/navbar"


// export default function Dashboard() {
//   return (
//     <div>
//       workspace
//     </div>
//   )
// }



import QuillEditor from '@/components/quill'; // Adjust the import path as per your project structure

const Dashboard = () => {
  return (
    <div>
      <h1>My Quill Editor</h1>
      <QuillEditor />
    </div>
  );
};

export default Dashboard;
