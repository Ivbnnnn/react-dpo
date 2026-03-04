import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ItemAddModal from "./ItemAddModal";
import { useState } from "react";

export default function ItemAddButton({owner_id}) {
     const [isOpen, setIsOpen] = useState(false);
  return (
        <>
      <button
        onClick={() => setIsOpen(true)}
        className="m-3 border-2 border-accent rounded-lg p-3 text-2xl"
      >
        Добавить
      </button>
      {isOpen && (
        <ItemAddModal
          owner_id={owner_id}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}