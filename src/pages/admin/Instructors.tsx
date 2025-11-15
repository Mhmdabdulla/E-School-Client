import { ConfirmDialog } from "@/components/common/ConfirmationDialog";
import { GenericPagination } from '@/components/common/pagination'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent} from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import { fetchAllInstructors } from '@/services/instructorServices'
import { toggleUserStatus } from '@/services/userServices'
import { type IInstructor } from '@/types/instructor'
import { type IUser } from '@/types/user'
import { MoreHorizontal } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'


const Instructors = () => {
  const [instructors, setInstructors] = useState<IInstructor[]>([])
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  useEffect(()=> {
    const debouce = setTimeout(()=>{
        setSearchQuery(search)
        setPage(1);
    },500)

    return ()=> clearTimeout(debouce)
  },[search])

  const getAllInstructors = useCallback(async () => {
    try {
      const data = await fetchAllInstructors(page, limit, searchQuery)
      console.log(data)
      setInstructors(data.instructorswithPagination.instructors)
      setTotalPages(data.instructorswithPagination.totalPages)
    } catch (error) {
      console.log(error)
    }
  },[limit, page, searchQuery])
  
  const confirmChangeStatus = async () => {
    if (!selectedUserId) return;

    try {
      await toggleUserStatus(selectedUserId);

      toast.success("Instructor status changed successfully", {
        position: "top-right",
      });
  
      setInstructors(prev =>
        prev.map(inst =>
          typeof inst.userId === "object" && inst.userId._id === selectedUserId
            ? {
                ...inst,
                userId: {
                  ...inst.userId,
                  status: inst.userId.status === "active" ? "blocked" : "active",
                },
              }
            : inst
        )
      );
    } catch (error) {
      console.log(error);
      toast.error("Error while changing instructor status", {
        position: "top-right",
      });
    }

    setConfirmDialogOpen(false);
    setSelectedUserId(null);
  };

  useEffect(()=> {
    getAllInstructors()
  },[getAllInstructors, page, searchQuery])

  return (
    <div className="flex-1 space-y-4 md:pl-64">
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-3xl font-bold tracking-tight">Tutors</h2>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search...."
            value={search}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value) }
          />
        </div>
      </div>
      <Card>
        <CardContent>
          <table className="w-full">
            <thead>
              <TableRow>
                <TableHead>Instructor</TableHead>
                <TableHead>Expertise</TableHead>
                <TableHead>Primary Language</TableHead>
                <TableHead>Current Occupation</TableHead> 
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </thead>
            <TableBody>
              {instructors.map((instructor) => {
                const instructorDetails = instructor.userId as IUser 
                return (
                  <TableRow key={instructor._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={instructorDetails.profileImageUrl} alt={instructorDetails.name} />
                          <AvatarFallback>
                            {instructorDetails.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{instructorDetails.name}</div>
                          <div className="text-sm text-muted-foreground">{instructorDetails.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{instructor.preferredSubjects[0]}</TableCell>
                    <TableCell className='text-center'>{instructor.teachingLanguages[0]}</TableCell>
                    <TableCell>{instructor.currentOccupation}</TableCell>
                    <TableCell>
                      <Badge variant={instructorDetails.status === "active" ? "default" : "destructive"}>
                        {instructorDetails.status === "active" ? "Active" : "Blocked"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUserId(instructorDetails._id);
                              setConfirmDialogOpen(true);                           
                            }}
                          >
                            {instructorDetails.status === "active" ? "Block tutor" : "Unblock tutor"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </table>
        </CardContent>
      </Card>
      {totalPages > 1 &&
        <GenericPagination currentPage={page} onPageChange={setPage} totalPages={totalPages}/>
      }
      <ConfirmDialog
        open={confirmDialogOpen}
        title="Change instructor status?"
        description="Are you sure you want to block/unblock this instructor?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={confirmChangeStatus}
        onCancel={() => {
          setConfirmDialogOpen(false);
          setSelectedUserId(null);
        }}
      />
    </div>
  )
}

export default Instructors