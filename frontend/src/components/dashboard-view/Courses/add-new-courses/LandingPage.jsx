import FromControls from "@/components/Common-Form-Controls/FromControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandingPageFormControls } from "@/config";
import { AdminContext } from "@/Context/admin/AdminContext";
import React, { useContext } from "react";

const LandingPage = () => {
  const { landingPageFormData, setlandingPageFormData } =
    useContext(AdminContext);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Course Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
          <FromControls
            fromcontrols={LandingPageFormControls}
            formData={landingPageFormData}
            setFromData={setlandingPageFormData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;
