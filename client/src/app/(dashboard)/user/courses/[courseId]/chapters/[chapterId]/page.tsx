"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar";
import Loading from "@/src/components/Loading";
import { useCourseProgressData } from "@/src/hooks/useCourseProgressData";

const Course = () => {
  const {
    user,
    course,
    userProgress,
    currentSection,
    currentChapter,
    isLoading,
    isChapterCompleted,
    updateChapterProgress,
    hasMarkedComplete,
    setHasMarkedComplete,
  } = useCourseProgressData();

  console.log("currentChapter.video:", currentChapter?.video);

  if (isLoading) return <Loading />;
  if (!user) return <div>Please sign in to view this course.</div>;
  if (!course || !userProgress) return <div>Error loading course</div>;

  return (
    <div className="course">
      <div className="course__container">
        {/* Breadcrumb */}
        <div className="course__breadcrumb">
          <div className="course__path">
            {course.title} / {currentSection?.sectionTitle} /{" "}
            <span className="course__current-chapter">
              {currentChapter?.title}
            </span>
          </div>

          <h2 className="course__title">{currentChapter?.title}</h2>

          <div className="course__header">
            <div className="course__instructor">
              <Avatar className="course__avatar">
                <AvatarImage alt={course.teacherName} />
                <AvatarFallback className="course__avatar-fallback">
                  {course.teacherName[0]}
                </AvatarFallback>
              </Avatar>
              <span className="course__instructor-name">
                {course.teacherName}
              </span>
            </div>
          </div>
        </div>

        {/* VIDEO SECTION */}
        <Card className="course__video">
          <CardContent className="course__video-container">
            {typeof currentChapter?.video === "string" ? (
              <video
                key={currentChapter.video}
                src={currentChapter.video}
                controls
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                }}
                onTimeUpdate={(e) => {
                  const video = e.currentTarget;

                  if (
                    video.duration &&
                    video.currentTime / video.duration >= 0.8 &&
                    !hasMarkedComplete &&
                    currentChapter &&
                    currentSection &&
                    userProgress?.sections &&
                    !isChapterCompleted()
                  ) {
                    setHasMarkedComplete(true);
                    updateChapterProgress(
                      currentSection.sectionId,
                      currentChapter.chapterId,
                      true
                    );
                  }
                }}
              />
            ) : (
              <div className="course__no-video">
                No video available for this chapter.
              </div>
            )}
          </CardContent>
        </Card>

        {/* CONTENT */}
        <div className="course__content">
          <Tabs defaultValue="Notes" className="course__tabs">
            <TabsList className="course__tabs-list">
              <TabsTrigger className="course__tab" value="Notes">
                Notes
              </TabsTrigger>
              <TabsTrigger className="course__tab" value="Resources">
                Resources
              </TabsTrigger>
              <TabsTrigger className="course__tab" value="Quiz">
                Quiz
              </TabsTrigger>
            </TabsList>

            <TabsContent className="course__tab-content" value="Notes">
              <Card className="course__tab-card">
                <CardHeader className="course__tab-header">
                  <CardTitle>Notes Content</CardTitle>
                </CardHeader>
                <CardContent className="course__tab-body">
                  {currentChapter?.content}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent className="course__tab-content" value="Resources">
              <Card className="course__tab-card">
                <CardHeader className="course__tab-header">
                  <CardTitle>Resources Content</CardTitle>
                </CardHeader>
                <CardContent className="course__tab-body">
                  {/* future resources */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent className="course__tab-content" value="Quiz">
              <Card className="course__tab-card">
                <CardHeader className="course__tab-header">
                  <CardTitle>Quiz Content</CardTitle>
                </CardHeader>
                <CardContent className="course__tab-body">
                  {/* future quiz */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Instructor Card */}
          <Card className="course__instructor-card">
            <CardContent className="course__instructor-info">
              <div className="course__instructor-header">
                <Avatar className="course__instructor-avatar">
                  <AvatarImage alt={course.teacherName} />
                  <AvatarFallback className="course__instructor-avatar-fallback">
                    {course.teacherName[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="course__instructor-details">
                  <h4 className="course__instructor-name">
                    {course.teacherName}
                  </h4>
                  <p className="course__instructor-title">
                    Senior UX Designer
                  </p>
                </div>
              </div>

              <div className="course__instructor-bio">
                <p>
                  A seasoned Senior UX Designer with over 15 years of experience
                  in creating intuitive and engaging digital experiences.
                  Expertise in leading UX design projects.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Course;
